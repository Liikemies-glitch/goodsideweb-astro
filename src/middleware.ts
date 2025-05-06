import { defineMiddleware } from 'astro:middleware';

// Määritellään tuetut kielet ja oletuskieli
const supportedLocales = ['fi', 'en'];
const defaultLocale = 'fi';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect } = context;
  const originalUrl = new URL(request.url);
  const originalPathname = originalUrl.pathname;

  console.log(`Middleware Entry: Original Pathname: "${originalPathname}"`);

  // 1. Ohitetaan Astron sisäiset resurssit ja jo kieliprefiksillä varustetut polut
  if (originalPathname.startsWith('/_astro/') || supportedLocales.some(locale => originalPathname.startsWith(`/${locale}/`))) {
    return next();
  }

  // 2. Käsitellään juuripolku ("/") URL-parametrien perusteella
  if (originalPathname === '/') {
    const searchParams = originalUrl.searchParams;
    const redirectToEn = searchParams.has('en') || searchParams.get('lang') === 'en';
    const targetLocale = redirectToEn ? 'en' : defaultLocale;
    const targetPath = `/${targetLocale}/`;
    
    console.log(`Middleware: Redirecting from '/' to '${targetPath}' based on URL parameters (redirectToEn: ${redirectToEn})`);
    return redirect(targetPath, 307);
  }

  // 3. Ohjataan muut kieliprefiksittömät polut oletuskielelle
  // Esim. /palvelut -> /fi/palvelut
  // Varmistetaan, että polun alussa on vain yksi kauttaviiva, vaikka originalPathname olisi vain "/" (joka on jo käsitelty)
  // tai jos se alkaa kauttaviivalla.
  const normalizedPath = originalPathname.startsWith('/') ? originalPathname : `/${originalPathname}`;
  const targetPath = `/${defaultLocale}${normalizedPath}`;
  
  console.log(`Middleware: Redirecting from '${originalPathname}' to '${targetPath}' (default locale redirect)`);
  return redirect(targetPath, 307); // Käytetään 307 (Temporary Redirect) tai 301 (Permanent) tarpeen mukaan
}); 