export HOST:=arm-none-linux-gnueabi
export CPP:="$(HOST)-gcc -E" 
export STRIP:="$(HOST)-strip" 
export OBJCOPY:="$(HOST)-objcopy" 
export AR:="$(HOST)-ar" 
export RANLIB:="$(HOST)-ranlib" 
export LD:="$(HOST)-ld" 
export OBJDUMP:="$(HOST)-objdump" 
export CC:="$(HOST)-gcc" 
export CXX:="$(HOST)-g++" 
export NM:="$(HOST)-nm" 
export AS:="$(HOST)-as"
export node_config_arch:=arm  
export node_config_nodedir:="../node/"
all: 
	cd page; bower --allow-root install;
	npm install --target_arch=arm
test:
	npm test
clean:
	rm -rf build
	rm -rf node_modules
	rm -rf page/bower_components
format: clean
	find . -name "*.cc" -exec astyle -n {} \;
	find . -name "*.js" -exec js-beautify -r {} \;	 
	find . -name "*.html" -exec html-beautify -r {} \;	 
	find . -name "*.css" -exec css-beautify -r {} \;	 
 	
	


