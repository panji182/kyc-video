import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const toRem = (pxValue: number) => {
  // maesurement for spacing
  //1rem = 16px
  const rem = pxValue / 16;
  return `${rem}rem`;
};

export const toEm = (pxValue: number) => {
  // maesurement for font size
  //1em = 16px
  const em = pxValue / 16;
  return `${em}em`;
};

export const encrypt = (obj: any, secretKey: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey).toString();
};

export const encryptString = (str: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(str, secretKey).toString();
};

export const encryptSHA256 = (str: string) => {
  return sha256(str).toString();
};

export const decrypt = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const decryptString = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getHTTPRequests = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  headers?: any,
  token?: string,
  body?: any
) => {
  const tokenContent = token ? { Authorization: `Bearer ${token}` } : {};
  const headersContent = headers ?? {};
  const headersParam =
    headers || token
      ? {
          ...headersContent,
          ...tokenContent,
        }
      : {};
  const bodyParam = body ? { body: JSON.stringify({ ...body }) } : {};
  const response = await fetch(`${process.env.BASE_API_URL}${url}`, {
    method,
    ...headersParam,
    ...bodyParam,
  });

  return await response.json();
};

export type columnProps = {
  columnLabels: any[];
  columnFields: any[];
};

export type jsPdfProps = {
  orientation: 'l' | 'p';
  unit: 'pt' | 'mm' | 'cm' | 'in' | 'px' | 'pc' | 'em' | 'ex';
  format: any[] | string;
};

export const exportToPDF = (
  title: string,
  jsPdfConfig: jsPdfProps,
  columns: columnProps,
  dataRows: any[],
  outputFileName: string
) => {
  const pdf = new jsPDF(
    jsPdfConfig.orientation,
    jsPdfConfig.unit,
    jsPdfConfig.format
  );
  const rows: any[] = [];

  dataRows.forEach(dataRow => {
    const temp = columns.columnFields.map(d => dataRow[d]);
    rows.push(temp);
  });

  const pageWidth =
    pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  pdf.text(pageWidth / 2 - 30, 40, title);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  pdf.autoTable(columns.columnLabels, rows, {
    startY: 65,
    theme: 'grid',
    styles: {
      font: 'times',
      halign: 'center',
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: 'normal',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [166, 204, 247],
    },
    alternateRowStyles: {
      fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    tableLineColor: [0, 0, 0],
  });
  pdf.save(outputFileName);
};
