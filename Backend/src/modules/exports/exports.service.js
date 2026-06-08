/**
 * Exports Service
 * Generates CSV and Excel exports of member data
 * Reuses the same dynamic query builder as the members service
 */
const { query } = require('../../config/database');
const { buildMemberQuery } = require('../members/members.service');
const { logger } = require('../../utils/logger');

/**
 * Export members matching the given filters
 * @param {object} filters - Same filters as getAllMembers
 * @param {string} format  - 'csv' or 'excel'
 * @returns {Promise<{ data: Buffer|string, contentType: string, filename: string }>}
 */
async function exportMembers(filters = {}, format = 'csv') {
  // Build query (no pagination — export all matching records)
  const { whereClause, params } = buildMemberQuery(filters);

  const result = await query(
    `SELECT full_name, school, programme, phone, email, is_verified, is_active, created_at, last_login_at
     FROM members
     ${whereClause}
     ORDER BY created_at DESC`,
    params
  );

  const rows = result.rows;
  const timestamp = new Date().toISOString().split('T')[0];

  if (format === 'excel') {
    return exportExcel(rows, timestamp);
  }

  return exportCSV(rows, timestamp);
}

/**
 * Generate CSV string
 */
function exportCSV(rows, timestamp) {
  const headers = ['Full Name', 'School', 'Programme', 'Phone', 'Email', 'Verified', 'Active', 'Registered', 'Last Login'];

  const csvRows = [headers.join(',')];

  for (const row of rows) {
    csvRows.push([
      escapeCSV(row.full_name),
      escapeCSV(row.school),
      escapeCSV(row.programme),
      escapeCSV(row.phone),
      escapeCSV(row.email || ''),
      row.is_verified ? 'Yes' : 'No',
      row.is_active ? 'Yes' : 'No',
      row.created_at ? new Date(row.created_at).toLocaleDateString() : '',
      row.last_login_at ? new Date(row.last_login_at).toLocaleDateString() : 'Never',
    ].join(','));
  }

  logger.info(`[EXPORT] CSV generated with ${rows.length} rows`);

  return {
    data: csvRows.join('\n'),
    contentType: 'text/csv',
    filename: `tn-connect-members-${timestamp}.csv`,
  };
}

/**
 * Generate Excel workbook
 */
async function exportExcel(rows, timestamp) {
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TN Connect';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Members');

  // Define columns
  sheet.columns = [
    { header: 'Full Name', key: 'full_name', width: 25 },
    { header: 'School', key: 'school', width: 30 },
    { header: 'Programme', key: 'programme', width: 25 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Verified', key: 'is_verified', width: 10 },
    { header: 'Active', key: 'is_active', width: 10 },
    { header: 'Registered', key: 'created_at', width: 15 },
    { header: 'Last Login', key: 'last_login_at', width: 15 },
  ];

  // Style header row
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2563EB' },
  };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Add data rows
  for (const row of rows) {
    sheet.addRow({
      full_name: row.full_name,
      school: row.school,
      programme: row.programme,
      phone: row.phone,
      email: row.email || '',
      is_verified: row.is_verified ? 'Yes' : 'No',
      is_active: row.is_active ? 'Yes' : 'No',
      created_at: row.created_at ? new Date(row.created_at).toLocaleDateString() : '',
      last_login_at: row.last_login_at ? new Date(row.last_login_at).toLocaleDateString() : 'Never',
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  logger.info(`[EXPORT] Excel generated with ${rows.length} rows`);

  return {
    data: buffer,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    filename: `tn-connect-members-${timestamp}.xlsx`,
  };
}

/**
 * Escape a value for CSV (handle commas, quotes, newlines)
 */
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

module.exports = { exportMembers };
