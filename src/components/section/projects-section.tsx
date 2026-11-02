import { type ProjectItem } from "@/lib/payload-data";
import { DATA } from "@/data/resume";
import { Project3DSlider } from "@/components/project-3d-slider";

export default function ProjectsSection({ data }: { data?: ProjectItem[] }) {
  const rawList = data && data.length > 0 ? data : (DATA.projects as unknown as ProjectItem[]);
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
