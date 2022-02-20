import { serve } from "https://deno.land/std@0.120.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  // console.log(pathname);

  const contentType = {
    html: "text/html; charset=UTF-8",
    css: "text/css",
    js: "text/javascript",
    json: "application/json",
    pdf: "application/pdf",
    jpg:"image/jpeg",
    jpeg:"image/jpeg",
    JPG:"image/jpeg",
    JPEG: "image/jpeg",
    png:"image/png",
    PNG: "image/png",
    gif: "image/gif",
    bmp: "image/bmp",
    svg: "image/svg+xml",
    zip:"application/zip",
  };

  const getFilePath = async (pathname) => {
    try {
      return await Deno.readFile(pathname === '/' ? './index.html' : `.${pathname}`);
    } catch (error) {
      return await Deno.readFile('./404.html');
    }
  }

  const getHeader = (pathname, contentType) => {
    try {
      return {
        headers: {
          "content-type" : contentType[pathname.split('.')[1]],
        }
      }
    } catch (error) {
      return {
        headers: {
          "content-type" : "text/html",
        }
      }
    }
  }

  return new Response(await getFilePath(pathname), getHeader(pathname,contentType),);
}

// console.log("Listening on http://localhost:8000");

serve(handleRequest);
