/**
 * Bloodline DNA Testing Service Management System
 * Admin Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initAdminUI();
    initCharts();
    initAdminActions();
});

/**
 * Initialize Admin UI elements
 */
function initAdminUI() {
    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.admin-header .container');
    if (header) {
        header.insertBefore(sidebarToggle, header.firstChild);
        
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.admin-sidebar').classList.toggle('active');
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
                    <li><a href="admin-profile.html"><i class="fas fa-user-circle"></i> My Profile</a></li>
                    <li><a href="admin-settings.html"><i class="fas fa-cog"></i> System Settings</a></li>
                    <li><a href="login.html"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
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
                    <h3>System Notifications</h3>
                    <a href="#" class="mark-all">Mark all as read</a>
                </div>
                <ul>
                    <li class="unread urgent">
                        <div class="notification-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="notification-content">
                            <p>Sample Storage Temperature Alert: Unit B3 temperature exceeded threshold (8°C)</p>
                            <span class="notification-time">10 minutes ago</span>
                        </div>
                    </li>
                    <li class="unread">
                        <div class="notification-icon"><i class="fas fa-database"></i></div>
                        <div class="notification-content">
                            <p>Database Backup Completed: Daily backup completed successfully</p>
                            <span class="notification-time">1 hour ago</span>
                        </div>
                    </li>
                    <li>
                        <div class="notification-icon"><i class="fas fa-user-plus"></i></div>
                        <div class="notification-content">
                            <p>New Lab Staff Account Created: Dr. Rebecca Johnson added as Lab Technician</p>
                            <span class="notification-time">2 hours ago</span>
                        </div>
                    </li>
                    <li>
                        <div class="notification-icon"><i class="fas fa-box"></i></div>
                        <div class="notification-content">
                            <p>Low Inventory Alert: DNA collection kits inventory below threshold (25 units remaining)</p>
                            <span class="notification-time">5 hours ago</span>
                        </div>
                    </li>
                </ul>
                <div class="dropdown-footer">
                    <a href="admin-notifications.html">View all notifications</a>
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
    
    // Period selector for revenue chart
    const periodBtns = document.querySelectorAll('.period-selector button');
    if (periodBtns.length) {
        periodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                periodBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update chart based on selected period
                updateRevenueChart(btn.textContent.toLowerCase());
            });
        });
    }
}

/**
 * Initialize Charts
 */
function initCharts() {
    // Revenue Chart
    initRevenueChart();
    
    // Test Distribution Chart
    initTestDistributionChart();
}

/**
 * Initialize Revenue Chart
 */
function initRevenueChart() {
    const revenueCanvas = document.getElementById('revenueChart');
    
    if (revenueCanvas) {
        const ctx = revenueCanvas.getContext('2d');
        
        // Sample data for revenue chart (monthly)
        const monthlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [85000, 92000, 88000, 94000, 102000, 110000, 108000, 115000, 120000, 125000, 128000, 135000],
                    backgroundColor: 'rgba(59, 111, 182, 0.1)',
                    borderColor: '#3b6fb6',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [65000, 68000, 66000, 70000, 75000, 78000, 77000, 80000, 82000, 85000, 87000, 90000],
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    borderColor: '#ea4335',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }
            ]
        };
        
        // Chart configuration
        const config = {
            type: 'line',
            data: monthlyData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value / 1000 + 'k';
                            }
                        }
                    }
                }
            }
        };
        
        // Create the chart and save reference
        window.revenueChart = new Chart(ctx, config);
    }
}

/**
 * Update Revenue Chart based on selected period
 */
function updateRevenueChart(period) {
    const chart = window.revenueChart;
    if (!chart) return;
    
    let labels, revenueData, expensesData;
    
    // Set data based on period
    switch(period) {
        case 'quarterly':
            labels = ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];
            revenueData = [255000, 306000, 343000, 380000, 390000, 425000, 480000, 520000];
            expensesData = [195000, 223000, 239000, 255000, 260000, 280000, 310000, 340000];
            break;
        case 'yearly':
            labels = ['2018', '2019', '2020', '2021', '2022', '2023'];
            revenueData = [950000, 1100000, 1250000, 1400000, 1550000, 1700000];
            expensesData = [700000, 820000, 880000, 950000, 1050000, 1200000];
            break;
        default: // monthly
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            revenueData = [85000, 92000, 88000, 94000, 102000, 110000, 108000, 115000, 120000, 125000, 128000, 135000];
            expensesData = [65000, 68000, 66000, 70000, 75000, 78000, 77000, 80000, 82000, 85000, 87000, 90000];
    }
    
    // Update chart data
    chart.data.labels = labels;
    chart.data.datasets[0].data = revenueData;
    chart.data.datasets[1].data = expensesData;
    chart.update();
}

/**
 * Initialize Test Distribution Chart
 */
function initTestDistributionChart() {
    const distributionCanvas = document.getElementById('testDistributionChart');
    
    if (distributionCanvas) {
        const ctx = distributionCanvas.getContext('2d');
        
        // Sample data for test distribution
        const data = {
            labels: ['Ancestry Test', 'Health Screening', 'Paternity Test', 'Forensic Test'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#4285F4', // Blue
                    '#34A853', // Green
                    '#FBBC05', // Yellow
                    '#EA4335'  // Red
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
 * Initialize Admin Action Buttons
 */
function initAdminActions() {
    // View test buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const testId = row.querySelector('td:first-child').textContent;
            
            // Redirect to test details page
            window.location.href = `admin-test-details.html?id=${testId}`;
        });
    });
    
    // Edit test buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const testId = row.querySelector('td:first-child').textContent;
            
            // Show edit modal
            showEditTestModal(testId, row);
        });
    });
    
    // Delete test buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const testId = row.querySelector('td:first-child').textContent;
            
            // Show confirmation modal
            showDeleteConfirmation(testId, row);
        });
    });
    
    // View user buttons
    document.querySelectorAll('.user-card .view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.user-card');
            const userName = card.querySelector('h4').textContent;
            
            // Redirect to user details page
            window.location.href = `admin-user-details.html?name=${encodeURIComponent(userName)}`;
        });
    });
    
    // Mark notification as read
    document.querySelectorAll('.notification-actions button').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.notification-item');
            item.classList.add('read');
            
            // Simulate marking as read in database
            setTimeout(() => {
                item.style.opacity = '0.5';
            }, 300);
        });
    });
}

/**
 * Show Edit Test Modal
 */
function showEditTestModal(testId, row) {
    // Get test details from the row
    const customer = row.querySelector('.customer-info span').textContent;
    const testType = row.cells[2].textContent;
    const submissionDate = row.cells[3].textContent;
    const status = row.querySelector('.status').textContent;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal edit-test-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Test ${testId}</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="edit-customer">Customer</label>
                    <input type="text" id="edit-customer" value="${customer}" disabled>
                </div>
                <div class="form-group">
                    <label for="edit-test-type">Test Type</label>
                    <select id="edit-test-type">
                        <option value="Ancestry DNA Test" ${testType === 'Ancestry DNA Test' ? 'selected' : ''}>Ancestry DNA Test</option>
                        <option value="Health Screening" ${testType === 'Health Screening' ? 'selected' : ''}>Health Screening</option>
                        <option value="Paternity Test" ${testType === 'Paternity Test' ? 'selected' : ''}>Paternity Test</option>
                        <option value="Forensic DNA Test" ${testType === 'Forensic DNA Test' ? 'selected' : ''}>Forensic DNA Test</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-date">Submission Date</label>
                    <input type="date" id="edit-date" value="${formatDateForInput(submissionDate)}">
                </div>
                <div class="form-group">
                    <label for="edit-status">Status</label>
                    <select id="edit-status">
                        <option value="Sample Received" ${status === 'Sample Received' ? 'selected' : ''}>Sample Received</option>
                        <option value="Processing" ${status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Kit Shipped" ${status === 'Kit Shipped' ? 'selected' : ''}>Kit Shipped</option>
                        <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Awaiting Review" ${status === 'Awaiting Review' ? 'selected' : ''}>Awaiting Review</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-notes">Notes</label>
                    <textarea id="edit-notes" rows="3" placeholder="Add notes about this test"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="cancel-edit">Cancel</button>
                <button class="btn btn-primary" id="save-edit">Save Changes</button>
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
    
    // Cancel button
    const cancelBtn = modal.querySelector('#cancel-edit');
    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Save button
    const saveBtn = modal.querySelector('#save-edit');
    saveBtn.addEventListener('click', () => {
        // Get new values
        const newTestType = modal.querySelector('#edit-test-type').value;
        const newDate = modal.querySelector('#edit-date').value;
        const newStatus = modal.querySelector('#edit-status').value;
        const notes = modal.querySelector('#edit-notes').value;
        
        // Show loading state
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Simulate saving to database
        setTimeout(() => {
            // Update row in table
            row.cells[2].textContent = newTestType;
            row.cells[3].textContent = formatDateForDisplay(newDate);
            row.querySelector('.status').textContent = newStatus;
            
            // Update status class
            const statusSpan = row.querySelector('.status');
            statusSpan.className = 'status';
            
            if (newStatus === 'Completed') {
                statusSpan.classList.add('completed');
            } else if (newStatus === 'Processing') {
                statusSpan.classList.add('processing');
            } else if (newStatus === 'Kit Shipped') {
                statusSpan.classList.add('shipped');
            } else if (newStatus === 'Sample Received') {
                statusSpan.classList.add('received');
            } else if (newStatus === 'Awaiting Review') {
                statusSpan.classList.add('awaiting');
            }
            
            // Show success message
            showAdminMessage(`Test ${testId} updated successfully`, 'success');
            
            // Close modal
            modal.remove();
        }, 1000);
    });
}

/**
 * Show Delete Confirmation Modal
 */
function showDeleteConfirmation(testId, row) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal delete-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirm Deletion</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete test ${testId}?</p>
                <p class="warning"><i class="fas fa-exclamation-triangle"></i> This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="cancel-delete">Cancel</button>
                <button class="btn btn-danger" id="confirm-delete">Delete</button>
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
    
    // Cancel button
    const cancelBtn = modal.querySelector('#cancel-delete');
    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Confirm button
    const confirmBtn = modal.querySelector('#confirm-delete');
    confirmBtn.addEventListener('click', () => {
        // Show loading state
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
        confirmBtn.disabled = true;
        
        // Simulate deletion from database
        setTimeout(() => {
            // Remove row from table with animation
            row.style.backgroundColor = '#ffebee';
            setTimeout(() => {
                row.style.opacity = '0';
                setTimeout(() => {
                    row.remove();
                    
                    // Show success message
                    showAdminMessage(`Test ${testId} has been deleted`, 'success');
                    
                    // Close modal
                    modal.remove();
                }, 300);
            }, 300);
        }, 1000);
    });
}

/**
 * Format date from display format to input format
 */
function formatDateForInput(displayDate) {
    const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
        'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    const parts = displayDate.split(' ');
    if (parts.length === 3) {
        const month = months[parts[0]];
        const day = parts[1].replace(',', '').padStart(2, '0');
        const year = parts[2];
        
        return `${year}-${month}-${day}`;
    }
    
    // Return current date if format is not recognized
    const now = new Date();
    return now.toISOString().split('T')[0];
}

/**
 * Format date from input format to display format
 */
function formatDateForDisplay(inputDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const date = new Date(inputDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

/**
 * Show admin message popup
 */
function showAdminMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.admin-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `admin-message ${type}`;
    
    // Add icon based on message type
    let icon = 'info-circle';
    if (type === 'success') {
        icon = 'check-circle';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
    } else if (type === 'warning') {
        icon = 'exclamation-triangle';
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