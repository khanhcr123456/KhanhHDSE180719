/**
 * Bloodline DNA Testing Service Management System
 * Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initDashboardUI();
    initAncestryChart();
    initActionButtons();
});

/**
 * Initialize Dashboard UI elements
 */
function initDashboardUI() {
    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.dashboard-header .container');
    if (header) {
        header.insertBefore(sidebarToggle, header.firstChild);
        
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
    
    // User dropdown menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = `
                <ul>
                    <li><a href="profile.html"><i class="fas fa-user-circle"></i> My Profile</a></li>
                    <li><a href="settings.html"><i class="fas fa-cog"></i> Settings</a></li>
                    <li><a href="index.html"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            `;
            
            // Remove existing dropdown if any
            const existingDropdown = document.querySelector('.user-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            
            // Add dropdown to DOM
            userMenu.appendChild(dropdown);
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!userMenu.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    }
    
    // Notification dropdown
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.addEventListener('click', () => {
            const dropdown = document.createElement('div');
            dropdown.className = 'notification-dropdown';
            dropdown.innerHTML = `
                <div class="dropdown-header">
                    <h3>Notifications</h3>
                    <a href="#" class="mark-all">Mark all as read</a>
                </div>
                <ul>
                    <li class="unread">
                        <div class="notification-icon"><i class="fas fa-flask"></i></div>
                        <div class="notification-content">
                            <p>Your Ancestry DNA test results are ready!</p>
                            <span class="notification-time">Just now</span>
                        </div>
                    </li>
                    <li class="unread">
                        <div class="notification-icon"><i class="fas fa-truck"></i></div>
                        <div class="notification-content">
                            <p>Your DNA collection kit has been shipped</p>
                            <span class="notification-time">2 hours ago</span>
                        </div>
                    </li>
                    <li>
                        <div class="notification-icon"><i class="fas fa-calendar-check"></i></div>
                        <div class="notification-content">
                            <p>Reminder: Genetic counseling appointment tomorrow at 2 PM</p>
                            <span class="notification-time">Yesterday</span>
                        </div>
                    </li>
                </ul>
                <div class="dropdown-footer">
                    <a href="notifications.html">View all notifications</a>
                </div>
            `;
            
            // Remove existing dropdown if any
            const existingDropdown = document.querySelector('.notification-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            
            // Add dropdown to DOM
            document.body.appendChild(dropdown);
            
            // Position dropdown
            const rect = notification.getBoundingClientRect();
            dropdown.style.top = rect.bottom + 10 + 'px';
            dropdown.style.right = window.innerWidth - rect.right + 'px';
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!notification.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
            
            // Mark all as read
            const markAllBtn = dropdown.querySelector('.mark-all');
            markAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.querySelectorAll('li.unread').forEach(item => {
                    item.classList.remove('unread');
                });
                notification.querySelector('.badge').style.display = 'none';
            });
        });
    }
}

/**
 * Initialize Ancestry Chart
 */
function initAncestryChart() {
    const ancestryCanvas = document.getElementById('ancestryChart');
    
    if (ancestryCanvas) {
        const ctx = ancestryCanvas.getContext('2d');
        
        // Sample data for ancestry breakdown
        const data = {
            labels: ['Western European', 'Eastern European', 'Scandinavian', 'Mediterranean', 'Other'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    '#4285F4', // Blue
                    '#34A853', // Green
                    '#FBBC05', // Yellow
                    '#EA4335', // Red
                    '#9C27B0'  // Purple
                ],
                borderWidth: 0
            }]
        };
        
        // Chart configuration
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        };
        
        // Create the chart
        new Chart(ctx, config);
    }
}

/**
 * Initialize action buttons functionality
 */
function initActionButtons() {
    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const testId = this.closest('tr').querySelector('td:first-child').textContent;
            window.location.href = `test-details.html?id=${testId}`;
        });
    });
    
    // Download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const testId = this.closest('tr').querySelector('td:first-child').textContent;
            // Simulate file download
            simulateDownload(testId);
        });
    });
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const testId = this.closest('tr').querySelector('td:first-child').textContent;
            // Show share modal
            showShareModal(testId);
        });
    });
    
    // Track buttons
    document.querySelectorAll('.track-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const testId = this.closest('tr').querySelector('td:first-child').textContent;
            // Show tracking modal
            showTrackingModal(testId);
        });
    });
    
    // Connect buttons in DNA matches
    document.querySelectorAll('.match-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const matchName = this.closest('.match-card').querySelector('h3').textContent;
            
            // Change button state
            this.innerHTML = 'Request Sent';
            this.classList.add('btn-secondary');
            this.disabled = true;
            
            // Show message
            showMessage(`Connection request sent to ${matchName}`, 'success');
        });
    });
}

/**
 * Simulate file download
 */
function simulateDownload(testId) {
    // Create a fake download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Bloodline_Test_Results_${testId.replace('#', '')}.pdf`;
    
    // Show loading message
    showMessage('Preparing your download...', 'info');
    
    // Simulate delay
    setTimeout(() => {
        // Show success message
        showMessage('Download started!', 'success');
        
        // Attempt to simulate download (will only work for actual files)
        try {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log('Would download file in production environment');
        }
    }, 1500);
}

/**
 * Show share modal
 */
function showShareModal(testId) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal share-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Test Results</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>Share your test results (${testId}) with:</p>
                <div class="share-options">
                    <button class="share-option" data-method="email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </button>
                    <button class="share-option" data-method="doctor">
                        <i class="fas fa-user-md"></i>
                        <span>Doctor</span>
                    </button>
                    <button class="share-option" data-method="link">
                        <i class="fas fa-link"></i>
                        <span>Get Link</span>
                    </button>
                </div>
                <div class="share-email-form" style="display: none;">
                    <div class="form-group">
                        <label for="share-email">Recipient Email</label>
                        <input type="email" id="share-email" placeholder="Enter email address">
                    </div>
                    <div class="form-group">
                        <label for="share-message">Message (Optional)</label>
                        <textarea id="share-message" rows="3" placeholder="Add a personal message"></textarea>
                    </div>
                    <button class="btn btn-primary send-email-btn">Send</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Share option buttons
    const shareOptions = modal.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            const method = option.dataset.method;
            
            if (method === 'email') {
                // Show email form
                modal.querySelector('.share-options').style.display = 'none';
                modal.querySelector('.share-email-form').style.display = 'block';
            } else if (method === 'doctor') {
                // Show doctor sharing confirmation
                showMessage('Your doctor will receive access to these results within 24 hours', 'success');
                modal.remove();
            } else if (method === 'link') {
                // Copy link to clipboard
                const dummyLink = `https://bloodlinedna.com/results/${testId.replace('#', '')}`;
                navigator.clipboard.writeText(dummyLink).then(() => {
                    showMessage('Link copied to clipboard!', 'success');
                    modal.remove();
                });
            }
        });
    });
    
    // Send email button
    const sendEmailBtn = modal.querySelector('.send-email-btn');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', () => {
            const email = modal.querySelector('#share-email').value;
            
            // Validate email
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showMessage(`Results shared with ${email}`, 'success');
            modal.remove();
        });
    }
}

/**
 * Show tracking modal
 */
function showTrackingModal(testId) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal tracking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Track Sample</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="tracking-info">
                    <h4>Test ID: ${testId}</h4>
                    <div class="tracking-timeline">
                        <div class="timeline-item completed">
                            <div class="timeline-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>Kit Shipped</h5>
                                <p>Your DNA collection kit was shipped</p>
                                <span class="timeline-date">Nov 10, 2023</span>
                            </div>
                        </div>
                        <div class="timeline-item active">
                            <div class="timeline-icon">
                                <i class="fas fa-truck"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>In Transit</h5>
                                <p>Your kit is on its way to you</p>
                                <span class="timeline-date">Nov 12, 2023</span>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-home"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>Kit Delivered</h5>
                                <p>Expected delivery date</p>
                                <span class="timeline-date">Nov 15, 2023</span>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-vial"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>Sample Collection</h5>
                                <p>Follow instructions to collect your DNA sample</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-flask"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>Lab Processing</h5>
                                <p>Your sample will be analyzed in our lab</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="timeline-content">
                                <h5>Results Ready</h5>
                                <p>Your DNA test results will be available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tracking-details">
                    <p><strong>Carrier:</strong> Express Delivery Services</p>
                    <p><strong>Tracking Number:</strong> EDS54921783654</p>
                    <p><strong>Estimated Delivery:</strong> Nov 15, 2023</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Utility function to show messages
 */
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message-popup ${type}`;
    
    // Add icon based on message type
    let icon = 'info-circle';
    if (type === 'success') {
        icon = 'check-circle';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
    }
    
    messageElement.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="close-message"><i class="fas fa-times"></i></button>
    `;
    
    // Add to DOM
    document.body.appendChild(messageElement);
    
    // Add close button functionality
    const closeBtn = messageElement.querySelector('.close-message');
    closeBtn.addEventListener('click', () => {
        messageElement.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('hiding');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

/**
 * Utility function to validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 