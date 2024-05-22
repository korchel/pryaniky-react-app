export interface fieldNames {
  companySigDate: string,
  companySignatureName: string,
  documentName: string,
  documentStatus: string,
  documentType: string,
  employeeNumber: string,
  employeeSigDate: string,
  employeeSignatureName: string,
}

export interface IData extends fieldNames {
  id: string,
}
