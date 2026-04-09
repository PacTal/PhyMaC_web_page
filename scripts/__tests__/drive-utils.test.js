// scripts/__tests__/drive-utils.test.js
const { driveToDownload } = require('../drive-utils');

describe('driveToDownload', () => {
  test('convierte URL /view a URL de descarga directa', () => {
    const input = 'https://drive.google.com/file/d/1ZWCNQd9gN3YVZn8MV01qZty2YMOFh4xJ/view?usp=sharing';
    const expected = 'https://drive.google.com/file/d/1ZWCNQd9gN3YVZn8MV01qZty2YMOFh4xJ/export?format=pdf';
    expect(driveToDownload(input)).toBe(expected);
  });

  test('retorna null si la URL es null', () => {
    expect(driveToDownload(null)).toBeNull();
  });

  test('retorna null si la URL es string vacío', () => {
    expect(driveToDownload('')).toBeNull();
  });

  test('retorna null si la URL es undefined', () => {
    expect(driveToDownload(undefined)).toBeNull();
  });

  test('no modifica URLs que ya tienen /export', () => {
    const url = 'https://drive.google.com/file/d/ABC123/export?format=pdf';
    expect(driveToDownload(url)).toBe(url);
  });
});
