// scripts/drive-utils.js
/**
 * Transforma un link de Google Drive de visor a descarga directa de PDF.
 * @param {string|null|undefined} url
 * @returns {string|null}
 */
function driveToDownload(url) {
  if (!url) return null;
  if (url.includes('/export')) return url;
  return url.replace(/\/view.*$/, '/export?format=pdf');
}

module.exports = { driveToDownload };
