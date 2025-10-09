import type { SVGProps } from "react";

export function SmartHostelLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>SmartHostel Logo</title>
      <g>
        <rect width="100" height="100" rx="20" ry="20" className="fill-primary" />
        <path d="M 50,25 L 85,50 L 85,80 L 15,80 L 15,50 Z" className="fill-primary-foreground" />
        <rect x="35" y="55" width="30" height="20" rx="5" ry="5" className="fill-primary" />
        <rect x="40" y="45" width="20" height="5" rx="2" ry="2" className="fill-primary" />
      </g>
    </svg>
  );
}
