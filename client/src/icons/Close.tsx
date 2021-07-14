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
        d="M1.92 1.92a.583.583 0 01.826 0L7 6.176l4.254-4.254a.583.583 0 11.825.825L7.825 7l4.254 4.254a.583.583 0 11-.825.825L7 7.825l-4.254 4.254a.583.583 0 11-.825-.825L6.175 7 1.921 2.746a.583.583 0 010-.825z"
        fill="currentColor"
      />
    </svg>
  );
}
