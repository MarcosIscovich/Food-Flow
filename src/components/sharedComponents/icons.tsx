import { component$ } from "@builder.io/qwik";


interface IconProps {
  size?: string;
}

const defaultSize = "18";


export const IconLogOut = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399c-.277.277-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26c-.602-.602-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117h-1.11Z"/><path fill="currentColor" d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68H15Z"/></svg>
    )
  }
);


export const IconComandaS = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m6 5.914l2.06-2.06v-.708L5.915 1l-.707.707l.043.043l.25.25l1 1h-3a2.5 2.5 0 0 0 0 5H4V7h-.5a1.5 1.5 0 1 1 0-3h3L5.207 5.293L5.914 6L6 5.914zM11 2H8.328l-1-1H12l.71.29l3 3L16 5v9l-1 1H6l-1-1V6.5l1 .847V14h9V6h-4V2zm1 0v3h3l-3-3z" clip-rule="evenodd"/></svg>
    )
  }
);

export const IconComanda = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m9.5 0h-1m-5.5 0h3m3.5-7h-3m-3.5 0h1M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V19"/></svg>
    )
  }
);


export const IconChange = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm4.17-5.24l-1.1-1.1c.71-1.33.53-3.01-.59-4.13A3.482 3.482 0 0 0 12 8.5c-.03 0-.06.01-.09.01L13 9.6l-1.06 1.06l-2.83-2.83L11.94 5L13 6.06l-.96.96c1.27.01 2.53.48 3.5 1.44c1.7 1.71 1.91 4.36.63 6.3zm-1.28 1.41L12.06 19L11 17.94l.95-.95a4.97 4.97 0 0 1-3.48-1.46a5.006 5.006 0 0 1-.64-6.29l1.1 1.1c-.71 1.33-.53 3.01.59 4.13c.7.7 1.63 1.04 2.56 1.01L11 14.4l1.06-1.06l2.83 2.83z"/></svg>
    );
  }
);

export const IconMove = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M3 11c0 2.45 1.76 4.47 4.08 4.91l-1.49-1.49L7 13l4 4.01L7 21l-1.41-1.41l1.58-1.58v-.06A7.007 7.007 0 0 1 1 11c0-3.87 3.13-7 7-7h3v2H8c-2.76 0-5 2.24-5 5zm19 0V4h-9v7h9zm-2-2h-5V6h5v3zm-7 4h9v7h-9z"/></svg>
    );
  }
);

export const IconBill = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M21 7v-.63c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37V15m18-4v9.374c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V19"/><path stroke-linejoin="round" d="m9.5 10.4l1.429 1.6L14.5 8"/><path d="M7.5 15.5H9m7.5 0H12"/></g></svg>
    );
  }
);

export const IconReserve = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 512v128H512V512h384zM512 896V768h384v128H512zm0 256v-128h256v128H512zM384 512v128H256V512h128zm0 256v128H256V768h128zm-128 384v-128h128v128H256zM128 128v1792h640v128H0V0h1115l549 549v219h-128V640h-512V128H128zm1024 91v293h293l-293-293zm640 805h256v1024H896V1024h256V896h128v128h384V896h128v128zm128 896v-512h-896v512h896zm0-640v-128h-896v128h896z"/></svg>
    )
  }
);

export const IconJoin = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M16 17q2.075 0 3.538-1.463T21 12q0-2.075-1.463-3.538T16 7q-.675 0-1.313.175t-1.187.5q.725.9 1.113 2T15 12q0 1.225-.388 2.325t-1.112 2q.55.325 1.188.5T16 17Zm-4-2q.475-.625.738-1.388T13 12q0-.85-.263-1.613T12 9q-.475.625-.738 1.388T11 12q0 .85.263 1.613T12 15Zm-4 2q.675 0 1.313-.175t1.187-.5q-.725-.9-1.113-2T9 12q0-1.225.388-2.325t1.112-2q-.55-.325-1.188-.5T8 7Q5.925 7 4.462 8.463T3 12q0 2.075 1.463 3.538T8 17Zm0 2q-2.925 0-4.963-2.038T1 12q0-2.925 2.038-4.963T8 5q1.125 0 2.138.325T12 6.25q.85-.6 1.863-.925T16 5q2.925 0 4.963 2.038T23 12q0 2.925-2.038 4.963T16 19q-1.125 0-2.138-.325T12 17.75q-.85.6-1.863.925T8 19Z"/></svg>

    );
  }
);

export const IconSearch = component$<IconProps>(
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
          d="M21.71 20.29l-4.83-4.83a8.5 8.5 0 1 0-1.42 1.42l4.83 4.83a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM10 17a7 7 0 1 1 7-7a7.008 7.008 0 0 1-7 7Z"
        />
      </svg>
    );
  }
);

export const IconBack = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z" clip-rule="evenodd"/></svg>
    );
  }
);

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

export const IconPhoto = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M24.25 10.25H20.5v-1.5h-9.375v1.5h-3.75a2 2 0 0 0-2 2v10.375a2 2 0 0 0 2 2H24.25a2 2 0 0 0 2-2V12.25a2 2 0 0 0-2-2zM15.812 23.5c-3.342 0-6.06-2.72-6.06-6.062s2.718-6.062 6.06-6.062s6.062 2.72 6.062 6.062s-2.72 6.06-6.062 6.06zm0-10.125a4.062 4.062 0 1 0 .001 8.127a4.062 4.062 0 0 0-.001-8.128z"/></svg>

        )
    });

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

export const IconUser = component$<IconProps>(
  ({ size: _size = defaultSize }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"/></svg>);
  });

