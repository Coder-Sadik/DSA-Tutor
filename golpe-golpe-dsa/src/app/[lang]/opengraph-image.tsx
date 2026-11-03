import { ImageResponse } from 'next/og';
import { locales, Locale, isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export const alt = 'Golpe Golpe DSA - Interactive Data Structures & Algorithms';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Locale = isValidLocale(rawLang) ? rawLang : 'bn';
  const dict = getDictionary(lang);

  const isBn = lang === 'bn';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F1B1D',
          color: '#E6F0EE',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,118,110,0.3) 0%, rgba(15,27,29,0) 70%)',
          }}
        />

        {/* Header Tag */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(60, 196, 180, 0.15)',
              border: '1.5px solid #3CC4B4',
              borderRadius: '9999px',
              padding: '8px 22px',
              color: '#3CC4B4',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {isBn ? 'গল্পে গল্পে DSA' : 'GOLPE GOLPE DSA'}
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <div
            style={{
              fontSize: isBn ? '56px' : '62px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#E6F0EE',
              marginBottom: '16px',
            }}
          >
            {dict.siteTitle}
          </div>
          <div
            style={{
              fontSize: '26px',
              lineHeight: 1.4,
              color: '#9DB5B1',
              maxWidth: '900px',
            }}
          >
            {dict.siteTagline}
          </div>
        </div>

        {/* Shelf of Books Motif */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '30px',
          }}
        >
          {/* Books row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '110px',
            }}
          >
            {/* Rafi's Messy Heap Motif (Left) */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div
                style={{
                  width: '32px',
                  height: '80px',
                  backgroundColor: '#E11D48',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '8px',
                  transform: 'rotate(-10deg)',
                }}
              />
              <div
                style={{
                  width: '36px',
                  height: '70px',
                  backgroundColor: '#D97706',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '8px',
                  transform: 'rotate(8deg)',
                }}
              />
              <div
                style={{
                  width: '34px',
                  height: '90px',
                  backgroundColor: '#475569',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '8px',
                }}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                width: '3px',
                height: '70px',
                backgroundColor: '#2A4044',
                borderRadius: '2px',
              }}
            />

            {/* Nila's Ordered Shelf Motif (Right) */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div
                style={{
                  width: '32px',
                  height: '80px',
                  backgroundColor: '#0F766E',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '92px',
                  backgroundColor: '#14B8A6',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '75px',
                  backgroundColor: '#F4B63D',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '100px',
                  backgroundColor: '#3CC4B4',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '10px',
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '85px',
                  backgroundColor: '#0D9488',
                  borderRadius: '4px 4px 0 0',
                }}
              />
            </div>
          </div>

          {/* Wooden Shelf Bar */}
          <div
            style={{
              width: '100%',
              height: '18px',
              backgroundColor: '#78350F',
              borderTop: '4px solid #B45309',
              borderRadius: '3px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

