import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QRCode } from '../components/QRCode'

describe('QRCode Component', () => {
  test('render input field with URL placeholder and download buttons', () => {
    render(<QRCode />)
    
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument()
    expect(screen.getByText('Download PNG')).toBeInTheDocument()
    expect(screen.getByText('Download JPEG')).toBeInTheDocument()
    expect(screen.getByText('Scan QR')).toBeInTheDocument()
  })

  test('update input value', () => {
    render(<QRCode />)
    
    const input = screen.getByPlaceholderText('URL')
    const testUrl = 'https://example.com'
    
    fireEvent.change(input, { target: { value: testUrl } })
    
    expect(input).toHaveValue(testUrl)
  })

  test('should display QR', () => {
    render(<QRCode />)
    
    const input = screen.getByPlaceholderText('URL')
    fireEvent.change(input, { target: { value: 'https://example.com' } })
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})