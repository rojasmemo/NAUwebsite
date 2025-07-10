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
      }
    },
    introduction,
    ctaBanner {
      ...,
      "image": image.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
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