export type MembershipStatus = {
  isActive: boolean
  source: 'stub'
}

export async function getMembershipStatus(): Promise<MembershipStatus> {
  return {
    isActive: false,
    source: 'stub',
  }
}
