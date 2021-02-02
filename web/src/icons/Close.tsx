import * as React from 'react';

export default function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.875em"
      height="0.875em"
      fill="currentColor"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.92.92a.583.583 0 01.826 0L6 5.176 10.254.921a.583.583 0 11.825.825L6.825 6l4.254 4.254a.583.583 0 11-.825.825L6 6.825l-4.254 4.254a.583.583 0 11-.825-.825L5.175 6 .921 1.746a.583.583 0 010-.825z"
      />
    </svg>
  );
}
