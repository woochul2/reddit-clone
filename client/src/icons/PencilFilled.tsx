import * as React from 'react';

export default function PencilFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M13.206 1.667c.221 0 .433.087.59.244l3.043 3.045a.833.833 0 010 1.178l-8.617 8.622a.834.834 0 01-.59.244H4.583a.833.833 0 01-.833-.833v-3.034c0-.22.088-.432.244-.589l8.623-8.633a.833.833 0 01.59-.244zm-10.289 15a.833.833 0 100 1.666h15a.833.833 0 000-1.666h-15z" />
    </svg>
  );
}
