document.addEventListener('DOMContentLoaded', function() {
    // Get service type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('type');

    // Update content based on service type
    updateServiceContent(serviceType);

    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(item => item.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

const serviceData = {
    paternity: {
        title: 'Paternity DNA Testing',
        description: 'Our paternity DNA testing service provides accurate and legally admissible results...',
        pricing: {
            standard: {
                price: '4,990,000 VND',
                turnaround: '5-7 business days',
                features: [
                    'Basic DNA Test Report',
                    'Email Support',
                    'Standard Processing',
                    'Basic Result Consultation'
                ]
            },
            express: {
                price: '6,990,000 VND',
                turnaround: '2-3 business days',
                features: [
                    'Detailed DNA Analysis',
                    'Priority Processing',
                    'Phone & Email Support',
                    'Extended Consultation',
                    'Digital & Physical Reports'
                ]
            },
            premium: {
                price: '9,990,000 VND',
                turnaround: '24 hours',
                features: [
                    'Comprehensive DNA Analysis',
                    'Same Day Processing',
                    '24/7 VIP Support',
                    'Expert Consultation Session',
                    'Legal Documentation Package',
                    'Lifetime Result Storage'
                ]
            }
        }
    },
    relationship: {
        title: 'Family Relationship Testing',
        pricing: {
            standard: {
                price: '5,990,000 VND',
                turnaround: '7-10 business days',
                features: [
                    'Basic Relationship Analysis',
                    'Standard Report',
                    'Email Support'
                ]
            },
            express: {
                price: '7,990,000 VND',
                turnaround: '3-5 business days',
                features: [
                    'Detailed Family Analysis',
                    'Priority Processing',
                    'Extended Support Hours',
                    'Comprehensive Report'
                ]
            },
            premium: {
                price: '11,990,000 VND',
                turnaround: '48 hours',
                features: [
                    'Advanced Genetic Analysis',
                    'Express Processing',
                    'VIP Support Package',
                    'Family Tree Mapping',
                    'Legal Documentation'
                ]
            }
        }
    },
    forensic: {
        title: 'Forensic DNA Testing',
        pricing: {
            standard: {
                price: '8,990,000 VND',
                turnaround: '10-12 business days',
                features: [
                    'Basic Forensic Analysis',
                    'Chain of Custody',
                    'Standard Report'
                ]
            },
            express: {
                price: '12,990,000 VND',
                turnaround: '5-7 business days',
                features: [
                    'Detailed Forensic Analysis',
                    'Priority Processing',
                    'Expert Consultation',
                    'Legal Documentation'
                ]
            },
            premium: {
                price: '15,990,000 VND',
                turnaround: '3 business days',
                features: [
                    'Advanced Forensic Analysis',
                    'Express Processing',
                    'Expert Testimony Available',
                    'Comprehensive Legal Package',
                    'Secure Evidence Storage'
                ]
            }
        }
    }
};

function updateServiceContent(serviceType) {
    const service = serviceData[serviceType] || serviceData.paternity;
    
    // Update basic info
    document.querySelector('.service-detail-hero h1').textContent = service.title;
    document.querySelector('.service-description p').textContent = service.description;

    // Update pricing section
    const pricingContainer = document.querySelector('.pricing-options');
    pricingContainer.innerHTML = Object.entries(service.pricing)
        .map(([level, details]) => `
            <div class="pricing-card ${level}">
                <h3>${level.charAt(0).toUpperCase() + level.slice(1)} Package</h3>
                <div class="price">
                    <span class="amount">${details.price}</span>
                    <span class="turnaround">Results in ${details.turnaround}</span>
                </div>
                <ul class="features">
                    ${details.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <button class="btn btn-primary" onclick="window.location.href='book-appointment.html?service=${serviceType}&package=${level}'">Book Appointment</button>
            </div>
        `).join('');

    // Update process timeline
    const processContainer = document.querySelector('.process-timeline');
    processContainer.innerHTML = service.process
        .map(step => `
            <div class="process-step">
                <div class="step-number">${step.step}</div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <p>${step.description}</p>
                    <div class="step-details">
                        <span><i class="fas fa-clock"></i> ${step.duration}</span>
                        <div class="requirements">
                            <strong>Requirements:</strong>
                            <ul>
                                ${step.requirements.map(req => `
                                    <li><i class="fas fa-dot-circle"></i> ${req}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
}