import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Projects } from './payload/collections/Projects'
import { Experiences } from './payload/collections/Experiences'
import { Education } from './payload/collections/Education'
import { Skills } from './payload/collections/Skills'
import { Media } from './payload/collections/Media'
import { Hackathons } from './payload/collections/Hackathons'
import { GithubRepositories } from './payload/collections/GithubRepositories'
import { Certificates } from './payload/collections/Certificates'

import { SiteSettings } from './payload/globals/SiteSettings'
import { Profile } from './payload/globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Projects, Experiences, Education, Skills, Media, Hackathons, GithubRepositories, Certificates],
  globals: [SiteSettings, Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'secure-payload-cms-secret-key-32-chars-min',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
