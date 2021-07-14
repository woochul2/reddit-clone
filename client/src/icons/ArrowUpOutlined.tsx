import * as React from 'react';

export default function ArrowUpOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21.5 12.25a9.25 9.25 0 10-18.5 0 9.25 9.25 0 0018.5 0z"
        clipRule="evenodd"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.721 13.692l-3.47-3.486-3.472 3.486"
      />
    </svg>
  );
}
