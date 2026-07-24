import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  schemaType?: 'Organization' | 'ArchitectureFirm' | 'Article';
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'Origin Consulting Interior | Architecture & Luxury Interior Design',
  description = 'Origin Consulting Interior delivers luxury Architecture, Interior Design, MEP Engineering, Structural Engineering, and Turnkey Fit-Out across UAE & KSA.',
  canonical = 'https://origin-consulting.com',
  ogImage = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
}) => {
  const schemaOrgJSON = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    name: 'Origin Consulting Interior',
    url: canonical,
    logo: 'https://origin-consulting.com/logo.png',
    image: ogImage,
    description: description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai Marina Plaza, Suite 2804',
      addressLocality: 'Dubai',
      addressCountry: 'UAE',
    },
    telephone: '+971480067444',
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
      />
    </>
  );
};
