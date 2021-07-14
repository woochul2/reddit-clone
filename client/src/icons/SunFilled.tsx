import * as React from 'react';

export default function SunFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.375em"
      height="1.375em"
      fill="currentColor"
      viewBox="0 0 22 22"
      {...props}
    >
      <path d="M10.082 17.417v2.75h1.833v-2.75h-1.833zm4.806-1.231l1.944 1.944h.002l1.295-1.295-1.945-1.946-1.296 1.297zm-11.021.648l1.297 1.296 1.944-1.945-1.297-1.296-1.944 1.945zm2.543-5.835a4.59 4.59 0 109.18.002A4.59 4.59 0 006.41 11zm11.005.918h2.75v-1.834h-2.75v1.834zm-15.584 0h2.75v-1.834h-2.75v1.834zm13.057-6.103l1.295 1.298 1.946-1.946-1.297-1.297-1.944 1.945zM3.87 5.167l1.943 1.945L7.11 5.816 5.166 3.871 3.87 5.167zm6.212-.584h1.833v-2.75h-1.833v2.75z" />
    </svg>
  );
}
