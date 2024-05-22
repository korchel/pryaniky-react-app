import { Dayjs } from "dayjs";

export interface fieldNames {
  companySigDate: Dayjs | null | string,
  companySignatureName: string,
  documentName: string,
  documentStatus: string,
  documentType: string,
  employeeNumber: string,
  employeeSigDate: Dayjs | null | string,
  employeeSignatureName: string,
}

export interface IData extends fieldNames {
  id: string,
}
