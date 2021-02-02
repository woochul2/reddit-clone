import * as React from 'react';

export default function PencilOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M13.206 1.667c.221 0 .433.087.59.244l3.043 3.045a.833.833 0 010 1.178l-8.617 8.622a.834.834 0 01-.59.244H4.583a.833.833 0 01-.833-.833v-3.034c0-.22.088-.432.244-.589l8.623-8.633a.833.833 0 01.59-.244zm0 2.012l-7.79 7.8v1.854h1.87l7.786-7.788-1.865-1.866zM2.084 17.5c0-.46.373-.833.834-.833h15a.833.833 0 010 1.666h-15a.833.833 0 01-.834-.833z"
        clipRule="evenodd"
      />
    </svg>
  );
}
