document.addEventListener("DOMContentLoaded", () => {
  // Sample Data (added more items for testing scroll and search)
  const allTableData = [
    {
      no: 1,
      documentName: "Passport Application Form.pdf",
      createBy: "naruwornv@gmail.com",
      workType: "Workflow",
      startDate: "30/06/2025",
      startTime: "22:17",
      status: "Cancel",
    },
    {
      no: 1,
      documentName: "Passport Application Form.pdf",
      createBy: "naruwornv@gmail.com",
      workType: "Workflow",
      startDate: "30/06/2025",
      startTime: "22:17",
      status: "Cancel",
    },
    {
      no: 1,
      documentName: "Passport Application Form.pdf",
      createBy: "naruwornv@gmail.com",
      workType: "Workflow",
      startDate: "30/06/2025",
      startTime: "22:17",
      status: "Cancel",
    },
  ];

  let currentTableData = [...allTableData]; // Data currently displayed
  let currentSortBy = "start_date"; // Default sort
  let currentSearchTerm = ""; // Current search term

  const tableBody = document.querySelector("#historyTable tbody");
  const searchInput = document.getElementById("searchInput");
  const sortDropdown = document.getElementById("sortDropdown");
  const sortDropdownButton = sortDropdown.querySelector(".dropdown-button");
  const sortDropdownContent = sortDropdown.querySelector(".dropdown-content");
  const totalRecordsSpan = document.querySelector(".total-records");

  // Function to render table rows
  function renderTable(dataToRender) {
    tableBody.innerHTML = ""; // Clear existing rows
    if (dataToRender.length === 0) {
      // colspan ကို 7 သို့ ပြောင်းပါ။ (column တစ်ခုလျော့သွားသည်)
      tableBody.innerHTML =
        '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #666;">No records found.</td></tr>';
      totalRecordsSpan.textContent = `0 Total records`;
      return;
    }
    dataToRender.forEach((item) => {
      const row = document.createElement("tr");
      let statusClass;
      switch (item.status.toLowerCase()) {
        case "cancel":
          statusClass = "cancel";
          break;
        case "complete":
          statusClass = "complete";
          break;
        case "pending":
          statusClass = "pending";
          break;
        default:
          statusClass = "";
      }

      row.innerHTML = `
                <td>${item.no}</td>
                <td>${item.documentName}</td>
                <td>${item.createBy}</td>
                <td>${item.workType}</td>
                <td>${item.startDate}<br>${item.startTime}</td>
                <td><span class="status ${statusClass}">${item.status}</span></td>
                <td><a href="#" class="download-icon" title="Download"><i class="fas fa-download"></i></a></td>`;
      tableBody.appendChild(row);
    });
    totalRecordsSpan.textContent = `${dataToRender.length} Total records`;
  }

  // Function to parse date for sorting (DD/MM/YYYY)
  function parseDate(dateStr, timeStr) {
    const [day, month, year] = dateStr.split("/");
    const [hour, minute] = timeStr.split(":");
    // Month is 0-indexed in JavaScript Date
    return new Date(year, month - 1, day, hour, minute);
  }

  // Function to sort the data
  function sortData(data, sortBy) {
    return data.sort((a, b) => {
      let valA, valB;
      if (sortBy === "start_date") {
        valA = parseDate(a.startDate, a.startTime).getTime();
        valB = parseDate(b.startDate, b.startTime).getTime();
        return valB - valA; // Descending for most recent date first
      } else if (sortBy === "document_name") {
        valA = a.documentName.toLowerCase();
        valB = b.documentName.toLowerCase();
      } else if (sortBy === "create_by") {
        valA = a.createBy.toLowerCase();
        valB = b.createBy.toLowerCase();
      } else if (sortBy === "work_type") {
        valA = a.workType.toLowerCase();
        valB = b.workType.toLowerCase();
      } else if (sortBy === "status") {
        valA = a.status.toLowerCase();
        valB = b.status.toLowerCase();
      }
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  }

  // Function to filter and search
  function applyFiltersAndSearch() {
    let filteredData = [...allTableData]; // Start with all original data

    // Apply search
    if (currentSearchTerm) {
      const searchTermLower = currentSearchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        // Check all string values in each item
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTermLower)
        )
      );
    }

    // Apply sorting
    filteredData = sortData(filteredData, currentSortBy);

    currentTableData = filteredData;
    renderTable(currentTableData);
  }

  // --- Event Listeners ---

  // Sort Dropdown Button Click
  sortDropdownButton.addEventListener("click", () => {
    sortDropdown.classList.toggle("active");
  });

  // Sort Option Click
  sortDropdownContent.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const selectedValue = event.target.dataset.value;
      const selectedText = event.target.textContent;

      sortDropdownButton.innerHTML = `${selectedText} <i class="fas fa-chevron-down dropdown-arrow"></i>`;
      sortDropdownButton.dataset.value = selectedValue;
      currentSortBy = selectedValue;
      sortDropdown.classList.remove("active");
      applyFiltersAndSearch();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!sortDropdown.contains(event.target)) {
      sortDropdown.classList.remove("active");
    }
  });

  // Search Input (debounce for better performance)
  let searchTimeout;
  searchInput.addEventListener("input", (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearchTerm = event.target.value.trim();
      applyFiltersAndSearch();
    }, 300); // 300ms debounce
  });

  // Initial render when the page loads
  applyFiltersAndSearch();
});
document.getElementById("homeButton").addEventListener("click", function () {
  window.location.href = "1page.html";
});
