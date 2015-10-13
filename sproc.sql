SET @fecha_desde = '2015-04-01';# MySQL ha devuelto un conjunto de valores vacío (es decir: cero columnas).

SET @fecha_hasta = '2015-08-31';# MySQL ha devuelto un conjunto de valores vacío (es decir: cero columnas).

SET @total = 0;# MySQL ha devuelto un conjunto de valores vacío (es decir: cero columnas).

call itemsEntreFechas(@fecha_desde, @fecha_hasta, @total);

