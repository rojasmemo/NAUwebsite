/**
 * Este archivo centraliza todas las consultas GROQ para el sitio.
 * Esto hace que sean reutilizables y más fáciles de gestionar.
 */

// Consulta para la página principal de /encuentros
export const paginaEncuentrosQuery = `{
  "page": *[_type == "paginaEncuentros" && !(_id in path("drafts.**"))][0] {
    title,
    seoDescription,
    mainBanner {
      ...,
      "image": image.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      },
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    },
    introduction,
    ctaBanner {
      ...,
      "image": image.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      },
      cta {
        text,
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    }
  },
  "encuentros": *[_type == "encuentro" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    "image": mainImage.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
    "alt": mainImage.alt,
    "description": body
  }
}`;

// Consulta para obtener todos los slugs de los encuentros para getStaticPaths
export const encuentroSlugsQuery = `*[_type == "encuentro" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current }`;

// Consulta para una página de encuentro individual por slug
export const encuentroPorSlugQuery = `*[_type == "encuentro" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  seoDescription,
  "image": mainImage {
    ...,
    asset->
  },
  "description": body
}`;

// Consulta para la página de inicio
export const homePageQuery = `*[_type == "homePage" && !(_id in path("drafts.**"))][0] {
  title,
  seoDescription,
  hero1 {
    ...,
    "image": image.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  splitSection1,
  hero2 {
    ...,
    "image": image.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  },
  featureSection {
    ...,
    feature1 {
      ...,
      "icon": icon.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      },
      link {
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    },
    feature2 {
      ...,
      "icon": icon.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      },
      link {
        externalUrl,
        internalLink->{_type, "slug": slug.current}
      }
    }
  },
  splitSection2,
  hero3 {
    ...,
    "image": image.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
    cta {
      text,
      externalUrl,
      internalLink->{_type, "slug": slug.current}
    }
  }
}`;
