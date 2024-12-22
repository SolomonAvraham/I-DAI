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
  title: string;
  description: string;
  image: string;
};

export default function ShareButtons({
  shareUrl,
  title,
  description,
}: ShareButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={48} round className="hover:scale-105" />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={48} round className="hover:scale-105" />
      </TwitterShareButton>
      <LinkedinShareButton
        source="https://i-dai.com"
        url={shareUrl}
        title={title}
        summary={description}
      >
        <LinkedinIcon size={48} round className="hover:scale-105" />
      </LinkedinShareButton>
      <WhatsappShareButton url={shareUrl} title={description} separator="">
        <WhatsappIcon size={48} round className="hover:scale-105" />
      </WhatsappShareButton>
    </div>
  );
}
