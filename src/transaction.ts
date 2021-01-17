import { AxiosInstance } from 'axios';
import {
  TransactionRequest,
  TransactionSingle,
  GetTransactionsRequest,
  AttachmentRead,
  TransactionArray,
  PiggyBankEventArray,
  TransactionWrapper,
} from '../types/transaction';
import { getOrThrow, postOrThrow, putOrThrow } from './helpers';

const addTransaction = (axiosInstance: AxiosInstance) => (
  transaction: TransactionRequest
): Promise<TransactionSingle> =>
  postOrThrow(axiosInstance, '/api/v1/transactions', transaction);

const getTransactions = (axiosInstance: AxiosInstance) => (
  request: GetTransactionsRequest
): Promise<TransactionArray> =>
  getOrThrow(axiosInstance, '/api/v1/transactions', request);

const getTransaction = (axiosInstance: AxiosInstance) => (
  id: number
): Promise<TransactionSingle> =>
  getOrThrow(axiosInstance, `/api/v1/transactions/${id}`);

const updateTransaction = (axiosInstance: AxiosInstance) => (
  id: number,
  transaction: TransactionRequest
): Promise<TransactionSingle> =>
  putOrThrow(axiosInstance, `/api/v1/transactions/${id}`, transaction);

const deleteTransaction = (axiosInstance: AxiosInstance) => async (
  id: number
): Promise<void> => {
  await axiosInstance.delete(`/api/v1/transactions/${id}`);
};

const listAttachments = (axiosInstance: AxiosInstance) => (
  id: number,
  page?: number
): Promise<AttachmentRead> =>
  getOrThrow(axiosInstance, `/api/v1/transactions/${id}/attachments`, {
    page,
  });

const getPiggyBankEvents = (axiosInstance: AxiosInstance) => (
  id: number,
  page?: number
): Promise<PiggyBankEventArray> =>
  getOrThrow(axiosInstance, `/api/v1/transactions/${id}/piggy_bank_events`, {
    page,
  });

const getTransactionByJournal = (axiosInstance: AxiosInstance) => (
  id: number
): Promise<TransactionSingle> =>
  getOrThrow(axiosInstance, `/api/v1/transactions/transaction-journals/${id}`);

export const createTransactionApi = (
  axiosInstance: AxiosInstance
): TransactionWrapper => ({
  addTransaction: addTransaction(axiosInstance),
  deleteTransaction: deleteTransaction(axiosInstance),
  listAttachments: listAttachments(axiosInstance),
  getPiggyBankEvents: getPiggyBankEvents(axiosInstance),
  getTransaction: getTransaction(axiosInstance),
  getTransactions: getTransactions(axiosInstance),
  getTransactionByJournal: getTransactionByJournal(axiosInstance),
  updateTransaction: updateTransaction(axiosInstance),
});
