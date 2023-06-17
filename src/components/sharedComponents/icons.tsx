import { component$ } from "@builder.io/qwik";

interface IconProps {
  size?: string;
}

const defaultSize = "18";

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

export const IconLeft  = component$<IconProps>(
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

export const IconRight  = component$<IconProps>(
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
