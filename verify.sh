#!/bin/bash
# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║        NOTIFICATION SYSTEM - FINAL VERIFICATION & CHECKLIST              ║
# ║                                                                           ║
# ║  Script ini membantu memverifikasi bahwa semua file sudah berada di      ║
# ║  tempat yang benar dan sistem siap digunakan.                            ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}         NOTIFICATION SYSTEM - FINAL VERIFICATION               ${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

# Counter
TOTAL=0
PASSED=0
FAILED=0

# Function to check file exists
check_file() {
    TOTAL=$((TOTAL + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $1 ${RED}(NOT FOUND)${NC}"
        FAILED=$((FAILED + 1))
    fi
}

# Function to check directory exists
check_dir() {
    TOTAL=$((TOTAL + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $1 ${RED}(NOT FOUND)${NC}"
        FAILED=$((FAILED + 1))
    fi
}

# Function to check content in file
check_content() {
    TOTAL=$((TOTAL + 1))
    if grep -q "$2" "$1"; then
        echo -e "${GREEN}✓${NC} Found '$2' in $1"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} NOT found '$2' in $1"
        FAILED=$((FAILED + 1))
    fi
}

echo -e "${YELLOW}📁 Checking directories...${NC}\n"
check_dir "src"
check_dir "src/js"
check_dir "src/js/modules"
check_dir "src/css"
check_dir "public"

echo -e "\n${YELLOW}📄 Checking main files...${NC}\n"
check_file "index.html"
check_file "style.css"
check_file "src/css/style.css"
check_file "src/js/script.js"

echo -e "\n${YELLOW}✨ Checking new notification files...${NC}\n"
check_file "src/js/modules/notificationUI.js"
check_file "README_NOTIFICATION.md"
check_file "NOTIFICATION_SYSTEM.md"
check_file "NOTIFICATION_IMPLEMENTATION.md"
check_file "NOTIFICATION_QUICK_REFERENCE.js"
check_file "NOTIFICATION_DEMO.html"
check_file "FILE_INDEX.md"

echo -e "\n${YELLOW}🔧 Checking modified files...${NC}\n"
check_file "src/js/modules/contact.js"
check_file "src/js/modules/notification.js"

echo -e "\n${YELLOW}📋 Checking HTML elements...${NC}\n"
check_content "index.html" "notificationBtn"
check_content "index.html" "notificationModal"
check_content "index.html" "notificationBadge"
check_content "index.html" "notificationUI.js"

echo -e "\n${YELLOW}🎨 Checking CSS content...${NC}\n"
check_content "src/css/style.css" ".notification-btn"
check_content "src/css/style.css" ".notification-modal"
check_content "src/css/style.css" "bellRing"
check_content "src/css/style.css" "badgePulse"

echo -e "\n${YELLOW}🔧 Checking JavaScript content...${NC}\n"
check_content "src/js/modules/notificationUI.js" "NotificationUIModule"
check_content "src/js/modules/notificationUI.js" "addNotification"
check_content "src/js/script.js" "NotificationUIModule.init"
check_content "src/js/modules/contact.js" "NotificationUIModule"

echo -e "\n${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                         VERIFICATION SUMMARY                    ${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}\n"

echo -e "Total Checks: ${YELLOW}$TOTAL${NC}"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}\n"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}✓ System is ready for use!${NC}\n"
    exit 0
else
    echo -e "${RED}✗ Some checks failed!${NC}"
    echo -e "${RED}✗ Please check missing files.${NC}\n"
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════════
# USAGE:
# chmod +x verify.sh
# ./verify.sh
# ═══════════════════════════════════════════════════════════════════════════
