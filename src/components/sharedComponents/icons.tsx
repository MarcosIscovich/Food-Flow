import { component$ } from "@builder.io/qwik";


interface IconProps {
  size?: string;
}

const defaultSize = "18";

export const IconQuestion = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
        />
      </svg>
    )

  }
);

export const IconMail = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 24 24"
        class="mr-2"
      >
        <path fill="currentColor" fill-opacity="0" d="M12 11L4 6H20L12 11Z">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="1s"
            dur="0.15s"
            values="0;0.3"
          />
        </path>
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
        >
          <rect
            width="18"
            height="14"
            x="3"
            y="5"
            stroke-dasharray="64"
            stroke-dashoffset="64"
            rx="1"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="64;0"
            />
          </rect>
          <path
            stroke-dasharray="24"
            stroke-dashoffset="24"
            d="M3 6.5L12 12L21 6.5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.6s"
              dur="0.4s"
              values="24;0"
            />
          </path>
        </g>
      </svg>
    );
  }
);
export const IconCupon = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 24 24"
        class="mr-2"
      >
        <path
          fill="currentColor"
          d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2Z"
        />
      </svg>
    );
  }
);

export const IconUp = component$<IconProps>(({ size: _size = defaultSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={_size}
      height={_size}
      viewBox="0 0 48 48"
    >
      <mask id="ipSUpOne0">
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="4"
          d="m12 29l12-12l12 12H12Z"
        />
      </mask>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSUpOne0)" />
    </svg>
  );
});

export const IconDown = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 48 48"
      >
        <mask id="ipSDownOne0">
          <path
            fill="#fff"
            stroke="#fff"
            stroke-linejoin="round"
            stroke-width="4"
            d="M36 19L24 31L12 19h24Z"
          />
        </mask>
        <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSDownOne0)" />
      </svg>
    );
  }
);

export const IconLeft = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 48 48"
      >
        <mask id="ipSLeftOne0">
          <path
            fill="#fff"
            stroke="#fff"
            stroke-linejoin="round"
            stroke-width="4"
            d="M30 36L18 24l12-12v24Z"
          />
        </mask>
        <path
          fill="currentColor"
          d="M0 0h48v48H0z"
          mask="url(#ipSLeftOne0)"
        />
      </svg>
    );
  }
);

export const IconRight = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 48 48"
      >
        <mask id="ipSRightOne0">
          <path
            fill="#fff"
            stroke="#fff"
            stroke-linejoin="round"
            stroke-width="4"
            d="m20 12l12 12l-12 12V12Z"
          />
        </mask>
        <path
          fill="currentColor"
          d="M0 0h48v48H0z"
          mask="url(#ipSRightOne0)"
        />
      </svg>
    );
  }
);

export const IconDelete = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
        />
      </svg>
    );
  }
);
export const IconEdit = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={_size}
        height={_size}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
        />
      </svg>
    );
  }
);

export const IconCheck = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 1024 1024"><path fill="green" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0z" />
      </svg>);
  });
export const IconClose = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 1024 1024"><path fill="red" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z" />
      </svg>);
  });

