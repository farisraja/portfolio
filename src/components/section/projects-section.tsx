import { type ProjectItem, FALLBACK_PROJECTS } from "@/lib/payload-data";
import { Project3DSlider } from "@/components/project-3d-slider";

export default function ProjectsSection({ data }: { data?: ProjectItem[] }) {
  const rawList = data && data.length > 0 ? data : FALLBACK_PROJECTS;
  const projectList = rawList.filter((p) => p.active !== false);

  if (projectList.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full">
      {/* 3D Cover Flow Slider & Work Gallery (ala Video Referensi) */}
      <Project3DSlider projects={projectList} />
    </div>
  );
}
