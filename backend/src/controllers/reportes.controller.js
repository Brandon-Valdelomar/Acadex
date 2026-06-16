/**
 * reportes.controller.js
 * 
 * Controlador para la generación de reportes.
 * Parte 9: reporte XML
 * Parte 10: reporte PDF
 */

import { tareas } from '../data/tareas.data.js'
import PDFDocument from 'pdfkit'

// ─── Parte 9: GET /api/reportes/xml ──────────────────────────────────────────
export function generarXML(req, res) {
  // Construir el XML manualmente (sin dependencias extra)
  const filas = tareas.map((t) => `
    <tarea>
      <id>${t.id}</id>
      <titulo>${escaparXML(t.titulo)}</titulo>
      <descripcion>${escaparXML(t.descripcion)}</descripcion>
      <estado>${escaparXML(t.estado)}</estado>
      <prioridad>${escaparXML(t.prioridad)}</prioridad>
    </tarea>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tareas>
  <generado>${new Date().toISOString()}</generado>
  <total>${tareas.length}</total>${filas}
</tareas>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="tareas.xml"')
  res.status(200).send(xml)
}

// ─── Parte 10: GET /api/reportes/pdf ─────────────────────────────────────────
export function generarPDF(req, res) {
  const doc = new PDFDocument({ margin: 50 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="tareas.pdf"')

  // Transmitir el PDF directamente al response
  doc.pipe(res)

  // ── Encabezado ──
  doc
    .fontSize(22)
    .fillColor('#0d6efd')
    .text('Acadex — Reporte de Tareas', { align: 'center' })

  doc
    .moveDown(0.3)
    .fontSize(10)
    .fillColor('#666')
    .text(`Generado: ${new Date().toLocaleString('es-CR')}`, { align: 'center' })
    .text(`Total de tareas: ${tareas.length}`, { align: 'center' })

  doc.moveDown(1)

  // ── Tabla de tareas ──
  tareas.forEach((tarea, index) => {
    // Color de fondo alternado
    const y = doc.y
    if (index % 2 === 0) {
      doc.rect(50, y, 495, 75).fill('#f0f4ff')
    }

    doc
      .fillColor('#000')
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`#${tarea.id} — ${tarea.titulo}`, 60, y + 8)

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#333')
      .text(tarea.descripcion, 60, y + 24, { width: 420 })

    doc
      .fontSize(9)
      .fillColor('#555')
      .text(`Estado: ${tarea.estado}   |   Prioridad: ${tarea.prioridad}`, 60, y + 56)

    doc.moveDown(1.5)

    // Salto de página si no hay espacio
    if (doc.y > 700) doc.addPage()
  })

  // ── Pie de página ──
  doc
    .moveDown(2)
    .fontSize(9)
    .fillColor('#aaa')
    .text('— Acadex | Plataforma Académica de Gestión de Tareas —', { align: 'center' })

  doc.end()
}

// ─── Helper: escapar caracteres especiales en XML ────────────────────────────
function escaparXML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
