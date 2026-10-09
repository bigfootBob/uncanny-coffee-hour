import React from 'react';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "Uncanny Coffee Hour";
  const defaultDescription = "Join Odd Bob and Dr. Kitsune for folklore, cryptids, and caffeine.";
  const defaultImage = "https://uncannycoffeehour.com/og-preview.jpg";
  const siteUrl = "https://uncannycoffeehour.com";

  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDesc = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || siteUrl;

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
    </>
  );
};

export default SEO;