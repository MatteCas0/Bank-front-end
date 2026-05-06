export interface Transaction {
    id: string
    account_id: string
    type: 'deposit' | 'withdrawal'
    amount: number
    description: string
    created_at: string
}