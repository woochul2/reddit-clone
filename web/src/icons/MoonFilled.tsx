import * as React from 'react';

export default function MoonFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 12.5a7.443 7.443 0 003.135-.685A8.333 8.333 0 0110 18.333 8.333 8.333 0 018.185 1.865 7.446 7.446 0 007.5 5a7.5 7.5 0 007.5 7.5z" />
    </svg>
  );
}
