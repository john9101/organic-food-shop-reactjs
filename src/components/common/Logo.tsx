interface LogoProps {
    className?: string;
}

const Logo = ({className}: LogoProps) => {
    return (
        <svg className={className} width="189" height="39" viewBox="0 0 189 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M43.7587 30.468C42.1027 30.468 40.5907 30.042 39.2227 29.19C37.8667 28.338 36.7807 27.198 35.9647 25.77C35.1607 24.33 34.7587 22.74 34.7587 21C34.7587 19.68 34.9927 18.45 35.4607 17.31C35.9287 16.158 36.5707 15.15 37.3867 14.286C38.2147 13.41 39.1747 12.726 40.2667 12.234C41.3587 11.742 42.5227 11.496 43.7587 11.496C45.4147 11.496 46.9207 11.922 48.2767 12.774C49.6448 13.626 50.7308 14.772 51.5347 16.212C52.3508 17.652 52.7588 19.248 52.7588 21C52.7588 22.308 52.5247 23.532 52.0567 24.672C51.5887 25.812 50.9408 26.82 50.1127 27.696C49.2967 28.56 48.3427 29.238 47.2507 29.73C46.1707 30.222 45.0067 30.468 43.7587 30.468ZM43.7587 26.076C44.6347 26.076 45.4207 25.842 46.1167 25.374C46.8127 24.906 47.3587 24.288 47.7548 23.52C48.1628 22.752 48.3667 21.912 48.3667 21C48.3667 20.064 48.1567 19.212 47.7367 18.444C47.3287 17.664 46.7707 17.046 46.0627 16.59C45.3667 16.122 44.5987 15.888 43.7587 15.888C42.8947 15.888 42.1147 16.122 41.4187 16.59C40.7227 17.058 40.1707 17.682 39.7627 18.462C39.3547 19.242 39.1507 20.088 39.1507 21C39.1507 21.948 39.3607 22.806 39.7807 23.574C40.2007 24.342 40.7587 24.954 41.4547 25.41C42.1627 25.854 42.9307 26.076 43.7587 26.076ZM52.6994 30L52.6814 12H57.0734L57.0914 13.602C57.7034 12.954 58.4354 12.444 59.2874 12.072C60.1394 11.688 61.0574 11.496 62.0414 11.496C62.7014 11.496 63.3614 11.592 64.0214 11.784L62.2934 16.212C61.8374 16.032 61.3814 15.942 60.9254 15.942C60.2174 15.942 59.5694 16.116 58.9814 16.464C58.4054 16.8 57.9434 17.262 57.5954 17.85C57.2594 18.426 57.0914 19.068 57.0914 19.776V30H52.6994ZM75.673 12H80.065V30.342C80.065 31.638 79.801 32.814 79.273 33.87C78.745 34.938 78.025 35.85 77.113 36.606C76.201 37.374 75.157 37.962 73.981 38.37C72.805 38.79 71.569 39 70.273 39C69.013 39 67.801 38.742 66.637 38.226C65.473 37.71 64.441 37.002 63.541 36.102C62.653 35.214 61.975 34.2 61.507 33.06L65.521 31.242C65.761 31.902 66.121 32.478 66.601 32.97C67.093 33.474 67.657 33.864 68.293 34.14C68.929 34.428 69.589 34.572 70.273 34.572C70.969 34.572 71.635 34.476 72.271 34.284C72.919 34.092 73.501 33.81 74.017 33.438C74.533 33.078 74.935 32.634 75.223 32.106C75.523 31.59 75.673 31.002 75.673 30.342V27.804C75.109 28.596 74.401 29.238 73.549 29.73C72.697 30.222 71.713 30.468 70.597 30.468C69.301 30.468 68.089 30.222 66.961 29.73C65.833 29.238 64.837 28.56 63.973 27.696C63.121 26.82 62.449 25.812 61.957 24.672C61.477 23.532 61.237 22.308 61.237 21C61.237 19.692 61.477 18.468 61.957 17.328C62.449 16.188 63.121 15.186 63.973 14.322C64.837 13.446 65.833 12.762 66.961 12.27C68.089 11.778 69.301 11.532 70.597 11.532C71.713 11.532 72.697 11.778 73.549 12.27C74.401 12.75 75.109 13.386 75.673 14.178V12ZM70.651 26.238C71.575 26.238 72.391 26.004 73.099 25.536C73.819 25.056 74.383 24.42 74.791 23.628C75.199 22.824 75.403 21.948 75.403 21C75.403 20.04 75.193 19.164 74.773 18.372C74.365 17.58 73.801 16.944 73.081 16.464C72.373 15.984 71.563 15.744 70.651 15.744C69.751 15.744 68.929 15.984 68.185 16.464C67.441 16.932 66.847 17.562 66.403 18.354C65.959 19.146 65.737 20.028 65.737 21C65.737 21.972 65.959 22.854 66.403 23.646C66.847 24.438 67.441 25.068 68.185 25.536C68.929 26.004 69.751 26.238 70.651 26.238ZM94.6653 12H99.0573V30H94.6653L94.4673 27.768C93.9753 28.572 93.3213 29.226 92.5053 29.73C91.7013 30.222 90.7473 30.468 89.6433 30.468C88.3113 30.468 87.0633 30.216 85.8993 29.712C84.7353 29.208 83.7093 28.512 82.8213 27.624C81.9453 26.736 81.2553 25.71 80.7513 24.546C80.2593 23.382 80.0133 22.134 80.0133 20.802C80.0133 19.518 80.2473 18.312 80.7153 17.184C81.1953 16.056 81.8613 15.066 82.7133 14.214C83.5653 13.362 84.5493 12.696 85.6653 12.216C86.7813 11.736 87.9813 11.496 89.2653 11.496C90.4533 11.496 91.5153 11.76 92.4513 12.288C93.3993 12.816 94.2033 13.488 94.8633 14.304L94.6653 12ZM89.5353 26.238C90.4713 26.238 91.2993 26.004 92.0193 25.536C92.7393 25.068 93.3033 24.438 93.7113 23.646C94.1193 22.842 94.3233 21.96 94.3233 21C94.3233 20.028 94.1193 19.146 93.7113 18.354C93.3033 17.55 92.7333 16.914 92.0013 16.446C91.2813 15.978 90.4593 15.744 89.5353 15.744C88.6113 15.744 87.7653 15.984 86.9973 16.464C86.2413 16.932 85.6353 17.562 85.1793 18.354C84.7353 19.146 84.5133 20.028 84.5133 21C84.5133 21.972 84.7413 22.854 85.1973 23.646C85.6533 24.438 86.2593 25.068 87.0153 25.536C87.7833 26.004 88.6233 26.238 89.5353 26.238ZM116.252 18.624V30H111.86V19.776C111.86 19.068 111.686 18.426 111.338 17.85C110.99 17.262 110.522 16.8 109.934 16.464C109.358 16.116 108.716 15.942 108.008 15.942C107.3 15.942 106.652 16.116 106.064 16.464C105.488 16.8 105.026 17.262 104.678 17.85C104.342 18.426 104.174 19.068 104.174 19.776V30H99.7821L99.7641 12H104.156L104.174 13.602C104.786 12.954 105.518 12.444 106.37 12.072C107.222 11.688 108.14 11.496 109.124 11.496C110.432 11.496 111.626 11.82 112.706 12.468C113.786 13.104 114.644 13.962 115.28 15.042C115.928 16.11 116.252 17.304 116.252 18.624ZM116.958 12H121.35V30H116.958V12ZM119.19 9.678C118.542 9.678 117.996 9.468 117.552 9.048C117.108 8.616 116.886 8.076 116.886 7.428C116.886 6.792 117.108 6.258 117.552 5.826C117.996 5.394 118.536 5.178 119.172 5.178C119.808 5.178 120.342 5.394 120.774 5.826C121.218 6.258 121.44 6.792 121.44 7.428C121.44 8.076 121.224 8.616 120.792 9.048C120.36 9.468 119.826 9.678 119.19 9.678ZM133.535 24.582L137.495 26.724C136.667 27.852 135.629 28.758 134.381 29.442C133.133 30.126 131.771 30.468 130.295 30.468C128.639 30.468 127.127 30.042 125.759 29.19C124.403 28.338 123.317 27.198 122.501 25.77C121.697 24.33 121.295 22.74 121.295 21C121.295 19.68 121.529 18.45 121.997 17.31C122.465 16.158 123.107 15.15 123.923 14.286C124.751 13.41 125.711 12.726 126.803 12.234C127.895 11.742 129.059 11.496 130.295 11.496C131.771 11.496 133.133 11.838 134.381 12.522C135.629 13.206 136.667 14.124 137.495 15.276L133.535 17.4C133.115 16.92 132.617 16.548 132.041 16.284C131.477 16.02 130.895 15.888 130.295 15.888C129.431 15.888 128.651 16.128 127.955 16.608C127.259 17.076 126.707 17.7 126.299 18.48C125.891 19.248 125.687 20.088 125.687 21C125.687 21.9 125.891 22.74 126.299 23.52C126.707 24.288 127.259 24.906 127.955 25.374C128.651 25.842 129.431 26.076 130.295 26.076C130.919 26.076 131.513 25.944 132.077 25.68C132.641 25.404 133.127 25.038 133.535 24.582ZM146.577 11.496C148.317 11.496 149.901 11.922 151.329 12.774C152.769 13.626 153.915 14.772 154.767 16.212C155.619 17.64 156.045 19.23 156.045 20.982C156.045 22.29 155.799 23.52 155.307 24.672C154.815 25.812 154.131 26.82 153.255 27.696C152.391 28.56 151.389 29.238 150.249 29.73C149.109 30.222 147.885 30.468 146.577 30.468C144.981 30.468 143.607 30.084 142.455 29.316C141.315 28.548 140.427 27.54 139.791 26.292V30H137.847V3H139.791V15.672C140.427 14.424 141.315 13.416 142.455 12.648C143.607 11.88 144.981 11.496 146.577 11.496ZM146.559 28.56C147.951 28.56 149.211 28.218 150.339 27.534C151.479 26.85 152.385 25.938 153.057 24.798C153.741 23.646 154.083 22.374 154.083 20.982C154.083 19.566 153.735 18.288 153.039 17.148C152.343 15.996 151.425 15.084 150.285 14.412C149.157 13.74 147.915 13.404 146.559 13.404C145.179 13.404 143.991 13.746 142.995 14.43C142.011 15.114 141.255 16.032 140.727 17.184C140.199 18.336 139.935 19.602 139.935 20.982C139.935 22.398 140.199 23.676 140.727 24.816C141.267 25.956 142.029 26.868 143.013 27.552C144.009 28.224 145.191 28.56 146.559 28.56ZM163.98 30.468C162.324 30.468 160.812 30.042 159.444 29.19C158.088 28.338 157.002 27.198 156.186 25.77C155.382 24.33 154.98 22.74 154.98 21C154.98 19.68 155.214 18.45 155.682 17.31C156.15 16.158 156.792 15.15 157.608 14.286C158.436 13.41 159.396 12.726 160.488 12.234C161.58 11.742 162.744 11.496 163.98 11.496C165.636 11.496 167.142 11.922 168.498 12.774C169.866 13.626 170.952 14.772 171.756 16.212C172.572 17.652 172.98 19.248 172.98 21C172.98 22.308 172.746 23.532 172.278 24.672C171.81 25.812 171.162 26.82 170.334 27.696C169.518 28.56 168.564 29.238 167.472 29.73C166.392 30.222 165.228 30.468 163.98 30.468ZM163.98 28.524C165.312 28.524 166.506 28.176 167.562 27.48C168.63 26.784 169.476 25.866 170.1 24.726C170.724 23.586 171.036 22.344 171.036 21C171.036 19.644 170.724 18.39 170.1 17.238C169.476 16.086 168.63 15.168 167.562 14.484C166.494 13.788 165.3 13.44 163.98 13.44C162.648 13.44 161.448 13.788 160.38 14.484C159.312 15.18 158.466 16.104 157.842 17.256C157.23 18.396 156.924 19.644 156.924 21C156.924 22.404 157.242 23.676 157.878 24.816C158.526 25.944 159.384 26.844 160.452 27.516C161.52 28.188 162.696 28.524 163.98 28.524ZM171.304 30L177.892 20.964L171.322 11.946H173.716L179.098 19.29L184.462 11.946H186.856L180.286 20.964L186.874 30H184.48L179.098 22.602L173.698 30H171.304Z"
                fill="black"/>
            <path
                d="M32.283 2.96698C28.2855 2.96698 22.638 3.30146 19.752 6.18596C18.5025 7.43549 17.8785 9.47244 18.0405 11.778C18.0615 12.0825 18.264 12.342 18.555 12.438C18.8445 12.5325 19.1625 12.444 19.3605 12.2115C20.9655 10.323 22.9605 8.80954 25.2945 7.71301C25.4925 7.61851 25.7265 7.61099 25.9395 7.68601C26.127 7.75351 26.274 7.88099 26.3505 8.04454C26.5095 8.38056 26.4585 8.82304 25.9305 9.07201C25.9005 9.08699 25.8735 9.10654 25.8435 9.12004C25.833 9.12454 25.821 9.12306 25.812 9.12756C20.061 11.8306 17.2335 16.5466 15.9495 21.3961C15.0135 15.3241 13.0365 11.7495 11.169 9.55506C9.81753 7.80308 8.48848 6.87453 7.72053 6.34958C7.57801 6.25206 7.14755 5.95808 6.96903 5.77956C6.67653 5.48706 6.67653 5.01153 6.96903 4.71903C7.26153 4.42801 7.73853 4.42801 8.06401 4.75201C8.14353 4.82253 8.27101 4.91253 8.43301 5.02053L8.56653 5.11053C9.65251 5.85451 11.6746 7.23601 13.4685 10.2105C13.629 10.476 13.9395 10.6185 14.241 10.5615C14.547 10.5075 14.787 10.272 14.8471 9.96752C15.2386 7.96804 15.0631 5.00098 13.2796 3.21751C10.3936 0.334477 4.7461 1.10326e-08 0.750094 1.10326e-08C0.336024 -7.03016e-05 0 0.335954 0 0.749954C0 4.74744 0.334477 10.3949 3.21898 13.281C4.42196 14.484 6.27751 15.024 8.12096 15.024C9.62544 15.024 11.1 14.6475 12.2295 13.995C13.7699 17.1869 15 21.9555 15 29.25C15 29.664 15.336 30 15.75 30C16.164 30 16.5 29.664 16.5 29.25C16.5 25.1805 17.1975 20.2964 19.791 16.2765C20.8305 17.292 22.62 17.9355 24.603 17.9955C24.702 17.9985 24.7995 18 24.897 18C26.9115 18 28.692 17.3685 29.8125 16.2464C32.6984 13.3605 33.0314 7.71294 33.0314 3.71539C33.0331 3.30146 32.6985 2.96698 32.283 2.96698Z"
                fill="#16A34A"/>
        </svg>
    )
}

export default Logo;