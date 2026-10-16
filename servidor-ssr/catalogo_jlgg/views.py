from django.shortcuts import render

# "Base de datos" falsa: una lista de diccionarios en memoria.
# En un proyecto real esto vendría de un modelo (models.py) y una tabla,
# pero para ENTENDER qué es SSR no necesitamos base de datos: lo importante
# es que estos datos se insertan en el HTML *antes* de enviarlo al navegador.
# Son los mismos 15 productos de catalogo.json (la versión CSR de la PWA).
PRODUCTOS = [
    {"nombre": "Ceviche de pescado", "categoria": "Frescos", "precio": 95, "stock": 20},
    {"nombre": "Aguachile verde", "categoria": "Frescos", "precio": 160, "stock": 20},
    {"nombre": "Aguachile negro", "categoria": "Frescos", "precio": 170, "stock": 20},
    {"nombre": "Coctel de camarón", "categoria": "Frescos", "precio": 150, "stock": 20},
    {"nombre": "Tostada de callo", "categoria": "Frescos", "precio": 110, "stock": 20},
    {"nombre": "Camarones a la diabla", "categoria": "Calientes", "precio": 190, "stock": 20},
    {"nombre": "Filete empanizado", "categoria": "Calientes", "precio": 170, "stock": 20},
    {"nombre": "Pescado zarandeado (kg)", "categoria": "Calientes", "precio": 320, "stock": 20},
    {"nombre": "Tacos gobernador (3)", "categoria": "Calientes", "precio": 135, "stock": 20},
    {"nombre": "Caldo siete mares", "categoria": "Calientes", "precio": 180, "stock": 20},
    {"nombre": "Clamato preparado", "categoria": "Bebidas", "precio": 80, "stock": 20},
    {"nombre": "Agua de coco", "categoria": "Bebidas", "precio": 45, "stock": 20},
    {"nombre": "Limonada", "categoria": "Bebidas", "precio": 40, "stock": 20},
    {"nombre": "Agua de horchata", "categoria": "Bebidas", "precio": 35, "stock": 20},
    {"nombre": "Refresco", "categoria": "Bebidas", "precio": 35, "stock": 20},
]


def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).

    request: el objeto que representa la petición que hizo el navegador.

    render() hace tres cosas:
      1) toma la plantilla 'catalogo/catalogo_ssr.html'
      2) le inyecta el diccionario de "contexto" (aquí: la lista de productos)
      3) devuelve el HTML final, YA CON LOS DATOS DENTRO, listo para el navegador.

    Por eso es "servidor": el HTML que llega al navegador ya trae escritos
    los nombres y precios. Si haces clic derecho > "Ver código fuente" de la
    página verás los productos en el HTML, aunque JavaScript esté desactivado.
    Compáralo con la vista CSR de la PWA (index.html), donde el HTML llega vacío
    y es JavaScript quien dibuja los productos DESPUÉS, ya en el navegador.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/catalogo_ssr.html', contexto)
