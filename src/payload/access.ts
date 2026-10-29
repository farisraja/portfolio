import type { Access, AccessArgs } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const isAdminOrFieldPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    published: {
      equals: true,
    },
  }
}

export const publicReadOnly: Access = ({ req: { user }, id }) => {
  return true
}
