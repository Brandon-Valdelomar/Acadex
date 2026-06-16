/**
 * reportes.routes.js
 * 
 * Rutas para la generación de reportes.
 * 
 * GET /api/reportes/xml  → descarga tareas.xml
 * GET /api/reportes/pdf  → descarga tareas.pdf
 */

import { Router } from 'express'
import { generarXML, generarPDF } from '../controllers/reportes.controller.js'

const router = Router()

router.get('/xml', generarXML)
router.get('/pdf', generarPDF)

export default router
