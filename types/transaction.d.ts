export enum TransactionType {
  ALL = 'all',
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
  RECONCILIATION = 'reconciliation',
  OPENING_BALANCE = 'opening_balance',
}

export enum AttachableType {
  BILL = 'Bill',
  TRANSACTION_JOURNAL = 'TransactionJournal',
  IMPORT_JOB = 'ImportJob',
}
export type TransactionSplitRequest = {
  type: string;
  date: string;
  amount: string;
  description: string;
  order: number | null;
  currency_id: number | null;
  currency_code: string | null;
  foreign_amount: string | null;
  foreign_currency_id: number | null;
  foreign_currency_code: string | null;
  budget_id: number | null;
  category_id: number | null;
  category_name: string;
  source_id: number | null;
  source_name: string | null;
  destination_id: number | null;
  destination_name: string | null;
  reconciled: boolean;
  piggy_bank_id?: number;
  piggy_bank_name?: string;
  bill_id?: number | null;
  bill_name?: string | null;
  tags: string[] | null;
  notes: string | null;
  internal_reference: string | null;
  external_id: string | null;
  bunq_payment_id: string | null;
  sepa_cc: string | null;
  sepa_ct_op: string;
  spea_ct_id: string | null;
  sepa_db: string | null;
  sepa_country: string | null;
  sepa_ep: string | null;
  sepa_ci: string | null;
  sepa_batch_id: string | null;
  interest_date: string | null;
  book_date: string | null;
  process_date: string | null;
  due_date: string | null;
  payment_date: string | null;
  invoice_date: string | null;
};

export type TransactionSplit = {
  readonly user: number;
  readonly transaction_journal_id: number;
  type: string;
  date: string;
  amount: string;
  description: string;
  order: number | null;
  currency_id: number | null;
  currency_code: string | null;
  readonly currency_symbol: string;
  readonly currency_name: string;
  readonly currency_decimal_places: string;
  foreign_amount: string | null;
  foreign_currency_id: number | null;
  foreign_currency_code: string | null;
  readonly foreign_currency_symbol: string | null;
  readonly foreign_currency_name: string | null;
  readonly foreign_currency_decimal_places: string | null;
  budget_id: number | null;
  readonly budget_name: string | null;
  category_id: number | null;
  category_name: string;
  source_id: number | null;
  source_name: string | null;
  readonly source_iban: string | null;
  readonly source_type: string; // TODO - Add Enum for this
  destination_id: number | null;
  destination_name: string | null;
  readonly destination_iban: string | null;
  readonly destination_type: string; // TODO - Add Enum for this
  reconciled: boolean;
  bill_id?: number | null;
  bill_name?: string | null;
  tags: string[] | null;
  notes: string | null;
  internal_reference: string | null;
  external_id: string | null;
  bunq_payment_id: string | null;
  readonly original_source: string | null;
  readonly recurrence_id: number | null;
  readonly recurrence_total: number;
  readonly recurrence_count: number;
  readonly import_hash_v2: string | null;
  sepa_cc: string | null;
  sepa_ct_op: string;
  spea_ct_id: string | null;
  sepa_db: string | null;
  sepa_country: string | null;
  sepa_ep: string | null;
  sepa_ci: string | null;
  sepa_batch_id: string | null;
  interest_date: string | null;
  book_date: string | null;
  process_date: string | null;
  due_date: string | null;
  payment_date: string | null;
  invoice_date: string | null;
};

export type TransactionRequest = {
  error_if_duplicate_hash: boolean;
  apply_rule: boolean;
  group_title: string;
  transactions: TransactionSplitRequest[];
};

export type Transaction = {
  readonly created_at: string;
  readonly updated_at: string;
  readonly user: number;
  error_if_duplicate_hash: boolean;
  apply_rule: boolean;
  group_title: string;
  transactions: TransactionSplit[];
};

export type ObjectLink = {
  0: {
    rel: string;
    uri: string;
  };
  self: string;
};

export type TransactionRead = {
  type: string;
  id: number;
  attributes: Transaction;
  links: ObjectLink;
};

export type TransactionArray = {
  data: TransactionRead[];
  meta: Meta;
  links: PageLink;
};

export type TransactionSingle = {
  data: TransactionRead;
};

export type Attachment = {
  readonly created_at: string;
  readonly updated_at: string;
  filename: string;
  attachable_type: string;
  attachable_id: string;
  md5: string;
  download_uri: string;
  upload_uri: string;
  title: string;
  notes: string;
  readonly mime: string;
  readonly size: number;
};

export type Meta = {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
};

export type AttachmentRead = {
  type: string;
  id: number;
  attributes: Attachment;
  links: ObjectLink;
  meta: Meta;
};

export type GetTransactionsRequest = {
  page: number;
  start: string;
  end: string;
  type?: TransactionType;
};

export type PiggyBankEvent = {
  created_at: string;
  updated_at: string;
  currency_id: number;
  currency_code: string;
  currency_symbol: string;
  currency_decimal_places: number;
  amount: string;
  journal_id: number;
  transaction_id: number;
};

export type PageLink = {
  self: string;
  first: string;
  last: string;
};

export type PiggyBankEventRead = {
  data: {
    readonly type: string;
    id: number;
    attributes: PiggyBankEvent;
    links: ObjectLink;
  };
  meta: Meta;
  links: PageLink;
};

export type PiggyBankEventArray = {
  data: PiggyBankEventRead[];
  meta: Meta;
  links: PageLink;
};

export interface TransactionWrapper {
  addTransaction(transaction: TransactionRequest): Promise<TransactionSingle>;
  deleteTransaction(transactionId: number): Promise<void>;
  listAttachments(transactionId: number, page?: number): Promise<AttachmentRead>;
  getPiggyBankEvents(transactionId: number, page?: number): Promise<PiggyBankEventArray>;
  getTransaction(transactionId: number): Promise<TransactionSingle>;
  getTransactions(request: GetTransactionsRequest): Promise<TransactionArray>;
  getTransactionByJournal(transactionId: number): Promise<TransactionSingle>;
  updateTransaction(transactionId: number, transaction: TransactionRequest): Promise<TransactionSingle>;
}