/**
 * PDF Brochure generator & download helper
 * Creates an elegant printable window or triggers a download blob
 */
export const downloadPropertyBrochure = async (property) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Popup blocker prevented opening the brochure. Please allow popups for this site.');
        resolve(false);
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${property.title} - Official Brochure | EstateIQ</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #059669; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: 800; color: #064e3b; }
            .logo span { color: #10b981; }
            .badge { background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
            .hero-img { width: 100%; height: 380px; object-fit: cover; border-radius: 12px; margin-top: 24px; }
            .title { font-size: 28px; font-weight: 800; margin-top: 20px; margin-bottom: 6px; }
            .location { color: #64748b; font-size: 16px; margin-bottom: 20px; }
            .price { font-size: 32px; font-weight: 800; color: #059669; margin-bottom: 24px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 24px; }
            .grid-item { text-align: center; }
            .grid-item .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
            .grid-item .val { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 4px; }
            .section { margin-top: 24px; }
            .section h3 { font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; color: #0f172a; }
            .amenities { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
            .amenity-chip { background: #f1f5f9; padding: 6px 14px; border-radius: 8px; font-size: 14px; color: #334155; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Estate<span>IQ</span></div>
            <div class="badge">VERIFIED LISTING</div>
          </div>
          <img src="${property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'}" class="hero-img" alt="Property Image" />
          <h1 class="title">${property.title}</h1>
          <div class="location">📍 ${property.location}, ${property.city || ''}</div>
          <div class="price">₹${Number(property.price).toLocaleString('en-IN')}</div>
          
          <div class="grid">
            <div class="grid-item">
              <div class="label">Bedrooms</div>
              <div class="val">${property.bhk} BHK</div>
            </div>
            <div class="grid-item">
              <div class="label">Bathrooms</div>
              <div class="val">${property.bathrooms} Baths</div>
            </div>
            <div class="grid-item">
              <div class="label">Super Area</div>
              <div class="val">${property.area} sq.ft</div>
            </div>
            <div class="grid-item">
              <div class="label">Furnishing</div>
              <div class="val">${property.furnishing || 'Semi-Furnished'}</div>
            </div>
          </div>

          <div class="section">
            <h3>Property Overview</h3>
            <p style="line-height: 1.6; color: #475569;">${property.description || 'Stunning property with premium architecture, ample natural light, and top-tier modern fittings throughout.'}</p>
          </div>

          <div class="section">
            <h3>Amenities & Highlights</h3>
            <div class="amenities">
              ${(property.amenities || ['Swimming Pool', 'Gym', '24/7 Security', 'Elevator', 'Power Backup', 'Clubhouse']).map(a => `<div class="amenity-chip">✓ ${a}</div>`).join('')}
            </div>
          </div>

          <div class="section">
            <h3>Contact Agent / Seller</h3>
            <p><strong>Name:</strong> ${property.agent?.name || property.seller?.name || 'EstateIQ Verified Specialist'}</p>
            <p><strong>Phone:</strong> ${property.agent?.phone || '+91 98765 43210'} | <strong>Email:</strong> ${property.agent?.email || 'contact@estateiq.com'}</p>
          </div>

          <div class="footer">
            Generated on ${new Date().toLocaleDateString()} | EstateIQ Intelligent Real Estate Marketplace. All rights reserved.
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      resolve(true);
    }, 800);
  });
};
