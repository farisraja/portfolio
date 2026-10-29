export interface DetectedTech {
  name: string
  category: 'framework' | 'language' | 'library' | 'tool'
  evidence: string
}

export interface LanguageByteInfo {
  language: string
  bytes: number
  percentage: number
}

export interface DetectionResult {
  detectedTechnologies: DetectedTech[]
  languages: LanguageByteInfo[]
  evidenceFiles: string[]
}

/**
 * Filter out markup/utility auxiliary languages from badge list
 * to keep project tags clean and focused on main technologies.
 */
const AUXILIARY_LANGUAGES = new Set([
  'html',
  'shell',
  'batchfile',
  'dockerfile',
  'tex',
  'mako',
  'less',
  'scss', // if CSS/Tailwind is present
  'makefile',
])

export function detectTechnologies(
  rawLanguages: Record<string, number> = {},
  manifests: {
    packageJson?: any
    composerJson?: any
    pyprojectToml?: string | null
    requirementsTxt?: string | null
    pubspecYaml?: string | null
    rootFileNames?: string[]
  } = {}
): DetectionResult {
  const detectedMap = new Map<string, DetectedTech>()
  const evidenceFiles: string[] = []

  // 1. Process Language byte stats
  const totalBytes = Object.values(rawLanguages).reduce((sum, b) => sum + (typeof b === 'number' ? b : 0), 0)
  const languageList: LanguageByteInfo[] = Object.entries(rawLanguages)
    .map(([lang, bytes]) => ({
      language: lang,
      bytes: Number(bytes),
      percentage: totalBytes > 0 ? Math.round((Number(bytes) / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)

  const hasLanguage = (name: string, minPercent = 1) => {
    const item = languageList.find((l) => l.language.toLowerCase() === name.toLowerCase())
    return item ? item.percentage >= minPercent : false
  }

  // 2. Inspect composer.json (PHP / Laravel ecosystems)
  if (manifests.composerJson && typeof manifests.composerJson === 'object') {
    evidenceFiles.push('composer.json')
    const require = manifests.composerJson.require || {}
    const requireDev = manifests.composerJson['require-dev'] || {}
    const allRequire = { ...require, ...requireDev }

    if (allRequire['laravel/framework']) {
      detectedMap.set('Laravel', {
        name: 'Laravel',
        category: 'framework',
        evidence: 'composer.json: require.laravel/framework',
      })
    }
    if (allRequire['livewire/livewire']) {
      detectedMap.set('Livewire', {
        name: 'Livewire',
        category: 'framework',
        evidence: 'composer.json: require.livewire/livewire',
      })
    }
    if (allRequire['inertiajs/inertia-laravel']) {
      detectedMap.set('Inertia.js', {
        name: 'Inertia.js',
        category: 'framework',
        evidence: 'composer.json: require.inertiajs/inertia-laravel',
      })
    }

    // If composer is present or PHP code exists
    if (hasLanguage('PHP', 1) || allRequire['php']) {
      detectedMap.set('PHP', {
        name: 'PHP',
        category: 'language',
        evidence: hasLanguage('PHP', 1) ? 'GitHub Languages: PHP' : 'composer.json: require.php',
      })
    }
  }

  // 3. Inspect package.json (Node / React / Next.js / Vue / Vite / Tailwind)
  if (manifests.packageJson && typeof manifests.packageJson === 'object') {
    evidenceFiles.push('package.json')
    const deps = manifests.packageJson.dependencies || {}
    const devDeps = manifests.packageJson.devDependencies || {}
    const allDeps = { ...deps, ...devDeps }

    if (allDeps['next']) {
      detectedMap.set('Next.js', {
        name: 'Next.js',
        category: 'framework',
        evidence: 'package.json: dependencies.next',
      })
    }
    if (allDeps['react'] || allDeps['react-dom'] || allDeps['@vitejs/plugin-react']) {
      detectedMap.set('React', {
        name: 'React',
        category: 'library',
        evidence: 'package.json: dependencies.react',
      })
    }
    if (allDeps['vue']) {
      detectedMap.set('Vue.js', {
        name: 'Vue.js',
        category: 'framework',
        evidence: 'package.json: dependencies.vue',
      })
    }
    if (
      allDeps['tailwindcss'] ||
      allDeps['@tailwindcss/vite'] ||
      allDeps['@tailwindcss/forms'] ||
      allDeps['@tailwindcss/postcss']
    ) {
      detectedMap.set('Tailwind CSS', {
        name: 'Tailwind CSS',
        category: 'framework',
        evidence: 'package.json: tailwindcss',
      })
    }
    if (allDeps['vite'] || allDeps['laravel-vite-plugin']) {
      detectedMap.set('Vite', {
        name: 'Vite',
        category: 'tool',
        evidence: 'package.json: vite',
      })
    }
    if (allDeps['@capacitor/core'] || allDeps['@capacitor/android'] || allDeps['@capacitor/cli']) {
      detectedMap.set('Capacitor', {
        name: 'Capacitor',
        category: 'framework',
        evidence: 'package.json: @capacitor/core',
      })
    }
    if (allDeps['express']) {
      detectedMap.set('Express', {
        name: 'Express',
        category: 'framework',
        evidence: 'package.json: dependencies.express',
      })
    }
    if (allDeps['@supabase/supabase-js'] || allDeps['@supabase/ssr']) {
      detectedMap.set('Supabase', {
        name: 'Supabase',
        category: 'library',
        evidence: 'package.json: @supabase/supabase-js',
      })
    }
    if (allDeps['framer-motion'] || allDeps['motion']) {
      detectedMap.set('Framer Motion', {
        name: 'Framer Motion',
        category: 'library',
        evidence: 'package.json: framer-motion',
      })
    }
    if (allDeps['prisma']) {
      detectedMap.set('Prisma', {
        name: 'Prisma',
        category: 'tool',
        evidence: 'package.json: prisma',
      })
    }
    if (allDeps['drizzle-orm']) {
      detectedMap.set('Drizzle ORM', {
        name: 'Drizzle ORM',
        category: 'library',
        evidence: 'package.json: drizzle-orm',
      })
    }
    if (allDeps['typescript'] || manifests.rootFileNames?.includes('tsconfig.json')) {
      detectedMap.set('TypeScript', {
        name: 'TypeScript',
        category: 'language',
        evidence: allDeps['typescript'] ? 'package.json: devDependencies.typescript' : 'tsconfig.json exists',
      })
    }
  }

  // 4. Inspect pyproject.toml & requirements.txt (Python ecosystem)
  const pyText = `${manifests.pyprojectToml || ''}\n${manifests.requirementsTxt || ''}`
  if (manifests.pyprojectToml) evidenceFiles.push('pyproject.toml')
  if (manifests.requirementsTxt) evidenceFiles.push('requirements.txt')

  if (pyText.trim()) {
    const hasPyPkg = (pkg: string) => new RegExp(`(^|["'\\s,])` + pkg + `([=><~"'\\[\\s,]|$)`, 'im').test(pyText)

    if (hasPyPkg('fastapi')) {
      detectedMap.set('FastAPI', {
        name: 'FastAPI',
        category: 'framework',
        evidence: manifests.pyprojectToml ? 'pyproject.toml: fastapi' : 'requirements.txt: fastapi',
      })
    }
    if (hasPyPkg('flask')) {
      detectedMap.set('Flask', {
        name: 'Flask',
        category: 'framework',
        evidence: manifests.pyprojectToml ? 'pyproject.toml: flask' : 'requirements.txt: flask',
      })
    }
    if (hasPyPkg('django')) {
      detectedMap.set('Django', {
        name: 'Django',
        category: 'framework',
        evidence: manifests.pyprojectToml ? 'pyproject.toml: django' : 'requirements.txt: django',
      })
    }
    if (hasPyPkg('sqlalchemy')) {
      detectedMap.set('SQLAlchemy', {
        name: 'SQLAlchemy',
        category: 'library',
        evidence: manifests.pyprojectToml ? 'pyproject.toml: sqlalchemy' : 'requirements.txt: sqlalchemy',
      })
    }
    if (hasPyPkg('pydantic')) {
      detectedMap.set('Pydantic', {
        name: 'Pydantic',
        category: 'library',
        evidence: manifests.pyprojectToml ? 'pyproject.toml: pydantic' : 'requirements.txt: pydantic',
      })
    }
    if (hasPyPkg('google-genai') || hasPyPkg('google-generativeai')) {
      detectedMap.set('Gemini AI', {
        name: 'Gemini AI',
        category: 'library',
        evidence: 'pyproject.toml: google-genai',
      })
    }
  }

  // 5. Inspect pubspec.yaml (Flutter / Dart)
  if (manifests.pubspecYaml) {
    evidenceFiles.push('pubspec.yaml')
    if (manifests.pubspecYaml.includes('sdk: flutter') || manifests.pubspecYaml.includes('flutter:')) {
      detectedMap.set('Flutter', {
        name: 'Flutter',
        category: 'framework',
        evidence: 'pubspec.yaml: sdk.flutter',
      })
    }
    if (manifests.pubspecYaml.includes('sdk: dart') || hasLanguage('Dart', 1)) {
      detectedMap.set('Dart', {
        name: 'Dart',
        category: 'language',
        evidence: 'pubspec.yaml: dart',
      })
    }
  }

  // 6. Include major languages from GitHub Languages API
  const topLanguage = languageList.length > 0 ? languageList[0] : null

  for (const item of languageList) {
    const lLower = item.language.toLowerCase()

    // Skip auxiliary markup/noise
    if (AUXILIARY_LANGUAGES.has(lLower)) {
      continue
    }

    const isTop = topLanguage && topLanguage.language.toLowerCase() === lLower

    // Always include Blade if present (>= 5%) or is top
    if (lLower === 'blade' && (item.percentage >= 5 || isTop)) {
      if (!detectedMap.has('Blade')) {
        detectedMap.set('Blade', {
          name: 'Blade',
          category: 'language',
          evidence: `GitHub Languages: Blade (${item.percentage}%)`,
        })
      }
      continue
    }

    // PHP
    if (lLower === 'php' && (item.percentage >= 5 || isTop || manifests.composerJson)) {
      if (!detectedMap.has('PHP')) {
        detectedMap.set('PHP', {
          name: 'PHP',
          category: 'language',
          evidence: `GitHub Languages: PHP (${item.percentage}%)`,
        })
      }
      continue
    }

    // Python
    if (lLower === 'python' && (item.percentage >= 5 || isTop || manifests.pyprojectToml || manifests.requirementsTxt)) {
      if (!detectedMap.has('Python')) {
        detectedMap.set('Python', {
          name: 'Python',
          category: 'language',
          evidence: `GitHub Languages: Python (${item.percentage}%)`,
        })
      }
      continue
    }

    // Dart
    if (lLower === 'dart' && (item.percentage >= 5 || isTop || manifests.pubspecYaml)) {
      if (!detectedMap.has('Dart')) {
        detectedMap.set('Dart', {
          name: 'Dart',
          category: 'language',
          evidence: `GitHub Languages: Dart (${item.percentage}%)`,
        })
      }
      continue
    }

    // TypeScript
    if (lLower === 'typescript' && (item.percentage >= 5 || isTop)) {
      if (!detectedMap.has('TypeScript')) {
        detectedMap.set('TypeScript', {
          name: 'TypeScript',
          category: 'language',
          evidence: `GitHub Languages: TypeScript (${item.percentage}%)`,
        })
      }
      continue
    }

    // JavaScript: only if TypeScript is NOT present or JS is top
    if (lLower === 'javascript' && !detectedMap.has('TypeScript') && (item.percentage >= 15 || isTop)) {
      if (!detectedMap.has('JavaScript')) {
        detectedMap.set('JavaScript', {
          name: 'JavaScript',
          category: 'language',
          evidence: `GitHub Languages: JavaScript (${item.percentage}%)`,
        })
      }
      continue
    }

    // CSS: only if Tailwind CSS is NOT detected and CSS is substantial (>= 20% or top)
    if (lLower === 'css' && !detectedMap.has('Tailwind CSS') && (item.percentage >= 20 || isTop)) {
      if (!detectedMap.has('CSS')) {
        detectedMap.set('CSS', {
          name: 'CSS',
          category: 'language',
          evidence: `GitHub Languages: CSS (${item.percentage}%)`,
        })
      }
    }
  }

  // 7. Sort detected technologies logically:
  // Frameworks first, then Languages, then Libraries, then Tools
  const categoryOrder: Record<string, number> = {
    framework: 1,
    language: 2,
    library: 3,
    tool: 4,
  }

  // Specific priority for key tech
  const priorityOrder: Record<string, number> = {
    'Next.js': 1,
    'Laravel': 2,
    'React': 3,
    'FastAPI': 4,
    'Flutter': 5,
    'TypeScript': 6,
    'Python': 7,
    'PHP': 8,
    'Dart': 9,
    'Tailwind CSS': 10,
    'Vite': 11,
    'Capacitor': 12,
    'Express': 13,
    'Supabase': 14,
    'SQLAlchemy': 15,
    'Pydantic': 16,
    'Framer Motion': 17,
    'Blade': 18,
    'CSS': 19,
    'JavaScript': 20,
  }

  const sortedTech = Array.from(detectedMap.values()).sort((a, b) => {
    const pA = priorityOrder[a.name] || 99
    const pB = priorityOrder[b.name] || 99
    if (pA !== pB) return pA - pB
    const cA = categoryOrder[a.category] || 9
    const cB = categoryOrder[b.category] || 9
    return cA - cB
  })

  return {
    detectedTechnologies: sortedTech,
    languages: languageList,
    evidenceFiles: Array.from(new Set(evidenceFiles)),
  }
}
