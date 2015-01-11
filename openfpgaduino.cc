#define BUILDING_NODE_EXTENSION
#include <string>
#include <sstream>
#include <map>
#include <node.h>
#include "simulation.h"

using namespace v8;
using namespace std;

#define DEFINE_FUNCTION_HANDLE(fun_name) \
Handle<Value> fun_name##_agent(const Arguments& args) {return agent(#fun_name, args);}
#define GET_FUNCTION_HANDLE(fun_name) \
fun_name##_agent
#define DEFINE_FUNCTION(ret,function,arg) \
{#ret,#function,#arg, (void*)function, GET_FUNCTION_HANDLE(function)}

typedef struct table_t {
	string return_type;
	string name;
	string arg_list;
	void* addr;
	Handle<Value> (*call)(const Arguments&);
} fun_table;

fun_table TABLE_NULL = { "", "", "", NULL, NULL };

extern fun_table table[];

int parser_func_arg_count(string arg_list) {
	int i = 1;
	const char* arg = arg_list.c_str();
	if (arg_list.length() == 0)
		return 0;
	while (*arg != '\0') {
		if (*arg == ',')
			i++;
		arg++;
	}
	return i;
}

#define REGISTER int
#define MAX_ARGC 8
#define ARG(x) (arg[x])
#define ARG0
#define ARG1 ARG(0)
#define ARG2 ARG1, ARG(1)
#define ARG3 ARG2, ARG(2)
#define ARG4 ARG3, ARG(3)
#define ARG5 ARG4, ARG(4)
#define ARG6 ARG5, ARG(5)
#define ARG7 ARG6, ARG(6)
#define ARG8 ARG7, ARG(7)
typedef int (*FUNC0)(void);
typedef int (*FUNC1)(REGISTER);
typedef int (*FUNC2)(REGISTER, REGISTER);
typedef int (*FUNC3)(REGISTER, REGISTER, REGISTER);
typedef int (*FUNC4)(REGISTER, REGISTER, REGISTER, REGISTER);
typedef int (*FUNC5)(REGISTER, REGISTER, REGISTER, REGISTER, REGISTER);
typedef int (*FUNC6)(REGISTER, REGISTER, REGISTER, REGISTER, REGISTER,
		REGISTER);
typedef int (*FUNC7)(REGISTER, REGISTER, REGISTER, REGISTER, REGISTER, REGISTER,
		REGISTER);
typedef int (*FUNC8)(REGISTER, REGISTER, REGISTER, REGISTER, REGISTER, REGISTER,
		REGISTER, REGISTER);

Handle<Value> agent(string name, const Arguments& args) {
	HandleScope scope;
	fun_table* table_p = table;
	void* func_address = NULL;
	int argc;
	REGISTER ret = 0;
	REGISTER arg[MAX_ARGC];

	while (table_p != &TABLE_NULL) {
		if (table_p->name == name) {
			func_address = table_p->addr;
			argc = parser_func_arg_count(table_p->arg_list);
		}
		table_p++;
	}

	if (func_address == NULL) {
		string message = "Wrong method name ";
		message+= name;
		ThrowException(Exception::TypeError(String::New(message.c_str())));
		return scope.Close(Undefined());
	}

	if (args.Length() != argc) {
		stringstream s;
		string message ="Wrong number of arguments need ";
		s << argc;
		message+= s.str();
		ThrowException(
				Exception::TypeError(String::New(message.c_str())));
		return scope.Close(Undefined());
	}

	for(int i=0; i< argc;i++) {
		if(!args[i]->IsNumber()) {
			stringstream s;
			string message ="Wrong arguments ";
			s << i;
			message+= s.str();
			ThrowException(Exception::TypeError(String::New(message.c_str())));
			return scope.Close(Undefined());
		}
	}

	for(int i=0; i< argc;i++)
		arg[i] = args[i]->NumberValue();

	switch (argc) {
	case 0:
		ret = ((FUNC0) func_address)(ARG0);
		break;
	case 1:
		ret = ((FUNC1) func_address)(ARG1);
		break;
	case 2:
		ret = ((FUNC2) func_address)(ARG2);
		break;
	case 3:
		ret = ((FUNC3) func_address)(ARG3);
		break;
	case 4:
		ret = ((FUNC4) func_address)(ARG4);
		break;
	case 5:
		ret = ((FUNC5) func_address)(ARG5);
		break;
	case 6:
		ret = ((FUNC6) func_address)(ARG6);
		break;
	case 7:
		ret = ((FUNC7) func_address)(ARG7);
		break;
	case 8:
		ret = ((FUNC8) func_address)(ARG8);
		break;
	default:
		break;
	}

	Local < Number > num = Number::New(ret);
	return scope.Close(num);
}

int add(int a, int b) {
	return a + b;
}

//Add handle
DEFINE_FUNCTION_HANDLE(add);
DEFINE_FUNCTION_HANDLE(led);
DEFINE_FUNCTION_HANDLE(ioa);
DEFINE_FUNCTION_HANDLE(iob);
DEFINE_FUNCTION_HANDLE(sleep);

//Add c function
fun_table table[] = {
DEFINE_FUNCTION(char,add,(char a, char b)),
DEFINE_FUNCTION(void,led,(int id, char r, char g, char b)),
DEFINE_FUNCTION(void,ioa,(int id, int value)),
DEFINE_FUNCTION(void,iob,(int id, int value)),
DEFINE_FUNCTION(unsigned int,sleep,(unsigned int seconds)),
TABLE_NULL
};
//todo map<string, void*> fun_table;

void Init(Handle<Object> exports) {
	fun_table* table_p = table;
	while (table_p != &TABLE_NULL) {
		exports->Set(String::NewSymbol(table_p->name.c_str()),
				FunctionTemplate::New(table_p->call)->GetFunction());
		table_p++;
	}
        //Add spetial case function whose parameter is not number
}

NODE_MODULE(openfpgaduino, Init)
