import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { type ProjectItem } from "@/lib/payload-data";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection({ data }: { data?: ProjectItem[] }) {
  const rawList = data && data.length > 0 ? data : (DATA.projects as unknown as ProjectItem[]);
  const projectList = rawList.filter((p) => p.active !== false);

  if (projectList.length === 0) {
    return null;
  }

  // Pilih proyek unggulan dari field featured CMS, atau urutan proyek published pertama
  const featuredProject = projectList.find((p) => p.featured) || projectList[0];
  const companionProjects = projectList.filter((p) => p.slug !== featuredProject.slug);

  const getWebsiteUrl = (p: ProjectItem) =>
    p.websiteUrl || p.links?.find((l) => l.type.toLowerCase() === "website")?.href;
  const getRepoUrl = (p: ProjectItem) =>
    p.repositoryUrl || p.links?.find((l) => l.type.toLowerCase() === "source")?.href;

  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full max-w-[600px]">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">Proyek</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-2 items-center justify-center text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            Karya & Proyek Terpilih
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-[600px] text-pretty">
            Berbagai proyek aplikasi web dan perangkat lunak yang telah saya rancang dan kembangkan,
            menggabungkan arsitektur bersih, performa andal, dan pengalaman pengguna yang intuitif.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        {/* 1. Kartu Proyek Unggulan (Featured Card - Spans full width / larger prominent card) */}
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <ProjectCard
            title={featuredProject.title}
            slug={featuredProject.slug || featuredProject.title.toLowerCase().replace(/\s+/g, "-")}
            summary={featuredProject.summary}
            description={featuredProject.description}
            dates={featuredProject.dates}
            tags={featuredProject.technologies}
            image={featuredProject.image}
            imageAlt={featuredProject.imageAlt}
            video={featuredProject.video}
            websiteUrl={getWebsiteUrl(featuredProject)}
            repositoryUrl={getRepoUrl(featuredProject)}
            isFeatured={true}
          />
        </BlurFade>

        {/* 2. Kartu Proyek Pendamping (Companion Cards - Asymmetric Bento Grid on Desktop, 1 Col on Mobile) */}
        {companionProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full auto-rows-fr">
            {companionProjects.map((project, id) => {
              const projectSlug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <BlurFade
                  key={projectSlug}
                  delay={BLUR_FADE_DELAY * 13 + id * 0.05}
                  className="h-full"
                >
                  <ProjectCard
                    title={project.title}
                    slug={projectSlug}
                    summary={project.summary}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    imageAlt={project.imageAlt}
                    video={project.video}
                    websiteUrl={getWebsiteUrl(project)}
                    repositoryUrl={getRepoUrl(project)}
                    isFeatured={false}
                  />
                </BlurFade>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
