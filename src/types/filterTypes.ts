export type Filters = {
    orgName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    status: 'all' | "active" | "inactive" | "pending" | "blacklisted"
}