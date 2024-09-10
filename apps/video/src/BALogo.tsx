import { fitText } from "@remotion/layout-utils";
import React from "react";
import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { c, makePulse } from "./helpers";

export const BaLogo = ({ width }: { width: number }) => {
  const textFill = c("text");
  const red = "#ec1c23";

  const text = "100% funded by";

  const { fontSize } = fitText({
    text,
    fontFamily: "Recursive",
    fontWeight: 400,
    withinWidth: width,
  });

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = makePulse({ frame, fps, speed: 3 });
  const scale = interpolate(pulse, [0, 1], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const color = interpolateColors(
    makePulse({ frame, fps, speed: 10 }),
    [0, 0.25, 0.5, 0.75, 1],
    [c("mauve"), c("lavender"), c("teal"), c("sky"), c("mauve")],
  );

  Easing.sin(frame);

  return (
    <div>
      <div style={{ fontSize, transform: `scale(${scale})`, color }}>
        {text}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 759.72 158.315"
        width={width}
      >
        <path
          d="M62.895 424.477c0-6.357.856-7.95 4.358-7.95 1.751 0 3.502.334 6.76 1.34v-8.283c-3.42-1.34-6.109-1.84-9.122-1.84-3.014 0-5.253.586-7.249 1.84-3.787 2.427-5.05 5.942-5.05 13.386v2.508H47.34v8.031h5.253v31.707h10.303V433.51h9.367v-8.03h-9.367v-1.002"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M78.004 448.654c0 3.93.53 7.11 1.344 9.452 1.75 4.769 7.126 7.95 13.235 7.95 4.846 0 8.022-1.508 11.117-5.441.163 2.007.407 3.347.855 4.601h9.774c-.244-.835-.407-1.421-.489-1.84a17.203 17.203 0 0 1-.53-4.35c0-.668-.08-1.755-.08-3.347v-30.2h-10.263v21.249c0 6.943-2.606 10.29-7.86 10.29-4.723 0-6.719-2.675-6.719-8.95v-22.59H78.004v23.176zm3.461-33.882c0 3.177 2.566 5.69 5.66 5.69 3.177 0 5.702-2.513 5.702-5.69 0-3.095-2.525-5.607-5.701-5.607-3.095 0-5.66 2.512-5.66 5.607zm17.063 0c0 3.177 2.566 5.69 5.66 5.69 3.177 0 5.702-2.513 5.702-5.69 0-3.095-2.525-5.607-5.701-5.607-3.095 0-5.66 2.512-5.66 5.607"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M123.858 430.667v4.434l.122 2.594v27.521h10.263v-18.488c0-8.951 2.524-13.048 7.86-13.048 2.198 0 4.275.668 6.19 1.922v-10.457l-.49-.167c-1.1-.249-1.588-.334-2.606-.334-4.846 0-8.185 2.675-11.362 9.118v-2.09c0-2.26-.163-4.434-.61-6.194h-9.855c.407 2.346.488 3.348.488 5.189"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M165.559 465.216h10.954l3.543-11.626h19.629l3.461 11.626h11.118l-18.977-55.799h-10.873l-18.855 55.8zm17.144-20.744 7.127-22.756 7.208 22.756h-14.335"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M219.924 430.667v4.434l.082 2.594v27.521h10.303v-18.488c0-8.951 2.484-13.048 7.86-13.048 2.158 0 4.235.668 6.19 1.922v-10.457l-.53-.167c-1.059-.249-1.588-.334-2.566-.334-4.846 0-8.226 2.675-11.402 9.118v-2.09c0-2.26-.163-4.434-.57-6.194h-9.855c.407 2.346.488 3.348.488 5.189"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M250.67 454.758v3.014c0 3.429-.122 5.69-.366 7.444h8.959c.489-1.84.57-2.675.774-5.35 2.158 4.181 5.66 6.19 10.629 6.19 10.18 0 17.307-8.618 17.307-20.83 0-11.884-6.8-20.582-16.167-20.582-4.52 0-7.697 1.673-10.873 5.856v-21.417H250.67v45.675zm26.837-9.618c0 7.53-3.258 12.298-8.47 12.298-5.01 0-8.104-4.516-8.104-12.046 0-7.53 3.176-12.131 8.389-12.131 5.09 0 8.185 4.434 8.185 11.879m52.777.753c0-13.3-6.923-21.502-18.162-21.502-11.606 0-19.384 8.617-19.384 21.417 0 12.632 7.615 20.496 19.628 20.496 8.796 0 15.312-4.684 17.104-12.295l-9.04-.338c-1.426 2.928-3.95 4.435-7.697 4.435-5.865 0-9.285-3.681-9.733-10.29h27.203c0-.836.081-1.504.081-1.923zm-26.918-5.522c1.222-5.355 4.073-8.03 8.593-8.03s7.126 2.675 7.94 8.03h-16.533m34.574-14.893v39.738h10.303v-39.738H337.94zm-.814-11.04c0 3.596 2.321 5.856 5.945 5.856 3.666 0 6.027-2.345 6.027-5.941 0-3.681-2.361-6.023-5.864-6.023-3.583 0-6.108 2.508-6.108 6.108"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M371.822 414.019h-9.936l-.286 11.46h-6.515v8.03h6.19l-.57 15.479c0 1.507-.082 3.095-.082 3.934 0 5.184.652 7.526 2.81 9.786 2.118 2.26 4.968 3.347 8.633 3.347 3.177 0 5.865-.586 9.122-1.84v-8.536c-2.362.92-4.031 1.34-5.945 1.34-3.177 0-3.991-1.255-3.991-5.69v-2.508l.244-15.312h8.267v-8.03h-8.104l.163-11.46"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M52.674 381.542h13.235c9.774 0 12.217-.252 16.126-1.421 6.19-2.012 10.303-7.782 10.303-14.64 0-7.448-4.031-12.05-12.135-13.89 6.353-2.008 9.122-5.604 9.122-11.794 0-6.023-3.258-10.792-8.715-12.633-2.891-1.005-6.353-1.42-12.95-1.42H52.674v55.798zm10.547-47.1h3.95c8.919 0 11.688 1.588 11.688 6.862 0 5.184-2.85 6.943-11.036 6.943h-4.602v-13.805zm0 22.255h5.01c10.14 0 13.234 1.922 13.234 8.197 0 6.357-2.687 7.946-13.48 7.946h-4.764v-16.143"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M99.79 364.976c0 3.934.53 7.11 1.345 9.456 1.75 4.769 7.126 7.945 13.235 7.945 4.846 0 8.022-1.507 11.117-5.437.163 2.008.407 3.348.855 4.602h9.774c-.244-.839-.407-1.421-.489-1.84a17.194 17.194 0 0 1-.53-4.35c0-.672-.08-1.759-.08-3.347v-30.2h-10.263v21.249c0 6.943-2.606 10.29-7.86 10.29-4.683 0-6.719-2.679-6.719-8.954v-22.586H99.791v23.172m45.976-12.127v28.693h10.263v-20.329c0-7.864 2.28-11.211 7.533-11.211 4.765 0 6.435 2.847 6.435 10.877v20.663H180.3V358.62c0-7.277-.245-9.036-1.833-11.879-2.036-3.514-6.434-5.774-11.402-5.774-4.847 0-8.837 2.007-11.77 5.941 0-2.342-.162-3.596-.855-5.103h-9.936c1.059 3.515 1.262 5.103 1.262 11.045"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M214.752 325.405v20.749c-2.932-3.763-5.66-5.188-10.303-5.188-9.692 0-16.696 8.784-16.696 21.082 0 12.131 6.841 20.329 16.9 20.329 5.335 0 8.674-1.84 11.28-6.357-.081 1.002-.081 1.34-.081 2.008 0 1.087.081 1.84.326 3.514h9.61c-.57-2.846-.733-5.774-.733-12.55v-43.587h-10.303zm.163 36.142c0 7.611-3.176 12.213-8.51 12.213-5.132 0-8.145-4.43-8.145-11.793 0-7.697 3.217-12.384 8.47-12.384 5.172 0 8.185 4.434 8.185 11.964m55.384.668c0-13.3-6.923-21.498-18.163-21.498-11.606 0-19.384 8.617-19.384 21.416 0 12.633 7.615 20.496 19.629 20.496 8.796 0 15.312-4.687 17.104-12.298l-9.041-.334c-1.425 2.928-3.95 4.435-7.697 4.435-5.864 0-9.285-3.682-9.733-10.29h27.204c0-.84.081-1.508.081-1.927zm-26.918-5.518c1.222-5.355 4.072-8.035 8.593-8.035 4.52 0 7.126 2.68 7.94 8.035h-16.533"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M292.778 340.632c-9.529 0-15.963 5.188-15.963 12.966 0 5.774 2.85 8.702 10.954 11.13l5.254 1.588c4.601 1.421 5.864 2.341 5.864 4.268 0 2.675-2.403 4.349-6.272 4.349-4.927 0-7.208-2.008-7.533-6.695h-9.693v.338c0 9.118 6.19 14.053 17.552 14.053 10.222 0 16.249-4.687 16.249-12.717 0-2.256-.53-4.264-1.589-5.856-1.67-2.676-4.113-3.93-10.873-5.938-8.959-2.68-9.732-3.095-9.732-5.607 0-2.423 2.361-4.097 5.538-4.097 3.828 0 5.945 1.674 6.434 5.436h9.896c-.53-8.364-6.475-13.218-16.086-13.218"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M333.38 349.082c4.316 0 6.026 1.673 6.026 6.023v.586l-1.506.334c-3.706.586-5.946 1.006-6.638 1.173-2.484.5-4.765 1.169-6.842 2.007-5.783 2.09-9.04 6.357-9.04 11.88 0 7.11 5.334 11.292 14.456 11.292 5.213 0 8.797-1.755 10.955-5.355 0 .338-.082.586-.082.839 0 1.173.163 1.922.611 3.681h9.367c-1.1-2.093-1.344-4.1-1.344-8.87v-15.975c0-5.107-.407-7.448-1.588-9.875-1.833-3.678-6.76-5.856-13.643-5.856-4.276 0-8.022.838-11.117 2.512-3.747 2.09-5.62 5.017-6.19 10.205h9.774c.61-3.095 2.85-4.601 6.8-4.601zm6.026 15.727c0 7.029-2.117 9.704-7.452 9.704-3.543 0-6.027-2.007-6.027-4.768 0-4.183 3.176-5.856 13.48-7.196v2.26m44.143-22.752c-3.176-.839-5.009-1.091-7.493-1.091-10.221 0-16.656 5.44-16.656 13.972 0 5.436 2.159 8.95 6.76 11.292-5.09 2.008-7.004 3.682-7.004 6.276 0 2.174 1.222 3.6 4.439 4.854-5.538 1.922-8.063 4.769-8.063 9.285 0 7.196 7.615 11.712 19.913 11.712 12.462 0 19.751-4.936 19.751-13.386 0-3.429-1.507-6.61-3.828-8.45-2.443-1.84-5.864-2.676-13.724-3.429-8.226-.835-8.714-1.006-8.714-2.508 0-1.173 1.588-2.175 3.91-2.346l5.049-.501c8.43-.753 12.787-4.683 12.787-11.46 0-2.594-.733-5.102-1.996-7.11h8.023v-7.363l-13.154.253zm-1.506 12.8c0 3.51-2.729 5.855-7.005 5.855-4.113 0-6.76-2.345-6.76-5.856 0-3.681 2.729-6.108 6.842-6.108 4.276 0 6.923 2.427 6.923 6.108zm3.298 31.12c0 3.095-3.543 4.936-9.896 4.936-6.923 0-11.036-1.927-11.036-5.103 0-3.18 3.584-4.94 9.774-4.94h.937c6.597.253 10.221 2.012 10.221 5.107m52.411-23.762c0-13.3-6.923-21.498-18.163-21.498-11.606 0-19.384 8.617-19.384 21.416 0 12.633 7.615 20.496 19.629 20.496 8.796 0 15.312-4.687 17.104-12.298l-9.041-.334c-1.425 2.928-3.95 4.435-7.697 4.435-5.864 0-9.285-3.682-9.733-10.29h27.204c0-.84.081-1.508.081-1.927zm-26.918-5.518c1.222-5.355 4.072-8.035 8.593-8.035 4.52 0 7.126 2.68 7.94 8.035h-16.533"
          style={{
            fill: textFill,
            fillRule: "evenodd",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M445.45 352.849v28.693h10.262v-20.329c0-7.864 2.28-11.211 7.534-11.211 4.764 0 6.434 2.847 6.434 10.877v20.663h10.303V358.62c0-7.277-.244-9.036-1.833-11.879-2.036-3.514-6.475-5.774-11.402-5.774-4.846 0-8.837 2.007-11.77 5.941 0-2.342-.162-3.596-.854-5.103h-9.937c1.06 3.515 1.263 5.103 1.263 11.045m57.867-22.51h-9.977l-.244 11.464h-6.516v8.031h6.19l-.57 15.475c0 1.507-.081 3.099-.081 3.934 0 5.188.651 7.53 2.85 9.79 2.077 2.256 4.928 3.343 8.593 3.343 3.176 0 5.864-.586 9.122-1.84v-8.532c-2.362.92-4.032 1.34-5.946 1.34-3.176 0-3.99-1.259-3.99-5.69v-2.512l.244-15.308h8.266v-8.03h-8.103l.162-11.464m15.842 34.635c0 3.934.53 7.11 1.344 9.456 1.75 4.769 7.126 7.945 13.235 7.945 4.846 0 8.022-1.507 11.117-5.437.163 2.008.407 3.348.815 4.602h9.814c-.244-.839-.448-1.421-.53-1.84a19.243 19.243 0 0 1-.488-4.35c0-.672-.082-1.759-.082-3.347v-30.2h-10.303v21.249c0 6.943-2.565 10.29-7.86 10.29-4.682 0-6.678-2.679-6.678-8.954v-22.586H519.16v23.172m46.708-17.983v4.43l.082 2.594v27.525h10.262v-18.488c0-8.951 2.525-13.052 7.9-13.052 2.159 0 4.236.668 6.19 1.926V341.47l-.53-.166c-1.099-.253-1.587-.338-2.605-.338-4.846 0-8.186 2.68-11.362 9.122v-2.094c0-2.26-.163-4.434-.57-6.19h-9.896c.448 2.342.53 3.348.53 5.189"
          style={{
            fill: textFill,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
        <path
          d="M-151.716 394.496c0-39.799 32.293-72.072 72.08-72.072s72.08 32.273 72.08 72.072c0 39.803-32.293 72.064-72.08 72.064-17.633 0-33.76-6.324-46.302-16.827 11.769-19.461 46.14-77.288 46.14-77.288l17.022 28.502s-8.96.045-17.064 0c-8.144-.045-10.465 1.706-14.008 7.11-2.932 4.488-9.855 16.212-10.018 16.428-.815 1.29-.326 2.541 1.588 2.541h83.198c1.67 0 2.647-1.169 1.588-2.623l-60.881-99.54c-.815-1.372-2.118-1.25-2.851 0l-62.022 103.535c-5.375-10.103-8.47-21.644-8.47-33.902"
          style={{
            fill: red,
            fillRule: "nonzero",
            stroke: "none",
          }}
          transform="translate(160.567 -315.335)"
        />
      </svg>
    </div>
  );
};
