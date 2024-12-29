"use client";

import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  XIcon,
} from "react-share";

type ShareButtonsProps = {
  shareUrl: string;
  image: string;
};

export default function ShareButtons({ shareUrl }: ShareButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={48} round className="hover:scale-105" />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <XIcon size={48} round className="hover:scale-105" />
      </TwitterShareButton>
      <LinkedinShareButton source="https://i-dai.com" url={shareUrl}>
        <LinkedinIcon size={48} round className="hover:scale-105" />
      </LinkedinShareButton>
      <WhatsappShareButton url={shareUrl} separator="">
        <WhatsappIcon size={48} round className="hover:scale-105" />
      </WhatsappShareButton>
    </div>
  );
}
