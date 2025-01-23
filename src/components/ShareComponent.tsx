'use client'

import Image from 'next/image';
import React from 'react'
import { IoShareSocial } from 'react-icons/io5';

const ShareComponent = ({ title, slug }: { title: string, slug: string }) => {
    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/${slug}`;
        const shareData = {
            title: title,
            text: title,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error("Error sharing content:", error);
            }
        } else {
            console.warn("Web Share API not supported. Copy link fallback");
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert("Link copied to clipboard!");
            });
        }
    };

    const handletelegramShare = () => {
        const shareUrl = `${window.location.origin}/${slug}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

        // Open the Telegram share URL in a new tab
        window.open(telegramUrl, "_blank");
    };


    const handleWhatappShare = () => {
        const shareUrl = `${window.location.origin}/${slug}`;
        const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
            `${title}\n${shareUrl}`
        )}`;

        // Open WhatsApp share link
        window.open(whatsappShareUrl, "_blank");
    };

    const handleSMSShare = async () => {
        const shareUrl = `${window.location.origin}/${slug}`;
        const messageText = `${title}: ${shareUrl}`;

        if (navigator.share) {
            try {
                // Try using the Web Share API
                await navigator.share({
                    title: title,
                    text: messageText,
                    url: shareUrl, // This is ignored in SMS, but required for some platforms
                });
            } catch (error) {
                console.error("Error sharing content:", error);
            }
        } else {
            // Fallback to SMS or clipboard copy
            const smsUrl = `sms:?body=${encodeURIComponent(messageText)}`;
            if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                // Open SMS client for mobile devices
                window.location.href = smsUrl;
            } else {
                // Copy the link to clipboard for desktop or unsupported devices
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("Link copied to clipboard!");
                });
            }
        }
    };

    const handleFacebookShare = async () => {
        const shareUrl = `${window.location.origin}/${slug}`;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

        window.open(facebookShareUrl, '_blank');
    };
    return (
        <div className="flex mt-2 items-center md:gap-10 gap-2">
            <div onClick={handleShare} className="flex cursor-pointer flex-col items-center">
                <IoShareSocial className="md:w-[23.45px] w-5  md:h-[34.49px] h-5" />

                <p className="md:text-xs text-[10px] text-[#3D5A80]">
                    Share
                </p>
            </div>

            <div className="cursor-pointer" onClick={handletelegramShare}>
                <Image
                    width={30}
                    height={30}
                    src="/images/logos_telegram.svg"
                    alt="logos_telegram"
                    className="md:w-[30px] md:h-[30px] w-6 h-6"
                />
            </div>
            <div className="cursor-pointer" onClick={handleWhatappShare}>
                <Image
                    width={34}
                    height={34}
                    src="/images/logos_whatsapp-icon.svg"
                    alt="logos_whatsapp-icon"
                    className="md:w-[34px] md:h-[34px] w-7 h-7"
                />
            </div>
            <div className="cursor-pointer" onClick={handleSMSShare}>
                <Image
                    width={30}
                    height={30}
                    src="/images/ant-design_message-filled.svg"
                    alt="ant-design_message-filled"
                    className="md:w-[30px] md:h-[30px] w-6 h-6"
                />
            </div>
            <div className="cursor-pointer" onClick={handleFacebookShare}>
                <Image
                    width={30}
                    height={30}
                    src="/images/logos_facebook.svg"
                    alt="logos_facebook"
                    className="md:w-[30px] md:h-[30px] w-6 h-6"
                />
            </div>
        </div>
    )
}

export default ShareComponent